# backend/api/views.py

import json
from datetime import timedelta

import openai
from django.conf import settings
from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Question, ReadingPassage, StudentProfile, GeneratedQuestionSet
from .serializers import (
    QuestionSerializer,
    ReadingPassageSerializer,
    StudentProfileSerializer,
    GeneratedQuestionSetSerializer
)
from .reading import generate_reading_data, save_reading_to_db

# Initialize OpenAI client
openai.api_key = settings.OPENAI_API_KEY


# ----------------------------
# API Endpoints
# ----------------------------

@api_view(["GET"])
def home(request):
    return Response({"message": "Welcome to the Edu-Bot API!"})


@api_view(["GET"])
def next_question(request):
    """
    Return the first question for a given subject, or 404 if none found.
    """
    subject = request.query_params.get("subject")
    q = Question.objects.filter(subject=subject).first()
    if q:
        return Response(QuestionSerializer(q).data)
    return Response({"error": "No question found for this subject"}, status=404)


@api_view(["GET"])
def reading_passage(request):
    """
    Return a random stored ReadingPassage (with its questions) or a default message.
    """
    passage = ReadingPassage.objects.order_by("?").first()
    if not passage:
        return Response({"passage": "No passage found.", "questions": []})
    return Response(ReadingPassageSerializer(passage).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def reading_quiz(request):
    """
    Return 5 random 'Reading' subject questions for a quick quiz.
    """
    questions = Question.objects.filter(subject="Reading").order_by("?")[:5]
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def latest_reading(request):
    """
    Return the most recently created ReadingPassage (with questions).
    If none exists, generate one via OpenAI and save it.
    """
    passage = ReadingPassage.objects.order_by("-created_at").first()

    if not passage:
        data = generate_reading_data()
        if not data:
            return Response({"error": "Generation failed"}, status=500)
        passage = save_reading_to_db(data)

    return Response(ReadingPassageSerializer(passage).data)


@api_view(["POST"])
def generate_reading_question(request):
    """
    Generate a new reading passage via OpenAI (using helper functions),
    save it to the database, and return its ID.
    """
    data = generate_reading_data()
    if not data:
        return Response({"error": "Failed to generate valid data"}, status=500)

    saved = save_reading_to_db(data)
    return Response({"message": "Saved", "passage_id": saved.id})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_student_profile(request):
    """
    Return the profile for the currently authenticated user.
    """
    try:
        profile = StudentProfile.objects.get(user=request.user)
    except StudentProfile.DoesNotExist:
        return Response({"detail": "Profile not found."}, status=404)

    serializer = StudentProfileSerializer(profile)
    return Response(serializer.data)


@api_view(["POST", "PUT"])
@permission_classes([IsAuthenticated])
def upsert_student_profile(request):
    """
    Create or update the StudentProfile for the authenticated user.
    """
    try:
        profile = StudentProfile.objects.get(user=request.user)
        serializer = StudentProfileSerializer(profile, data=request.data, partial=True)
    except StudentProfile.DoesNotExist:
        serializer = StudentProfileSerializer(data=request.data)

    if serializer.is_valid():
        profile_obj = serializer.save(user=request.user)
        return Response(StudentProfileSerializer(profile_obj).data)

    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_or_generate_questions(request):
    """
    1) Ensure the student has a profile; 400 if not.
    2) If a GeneratedQuestionSet exists in the last 24h, return it.
    3) Otherwise, build a prompt from StudentProfile, call OpenAI, save,
       and return the new GeneratedQuestionSet.
    """
    user = request.user

    # 1) Check for profile
    try:
        profile = user.student_profile
    except StudentProfile.DoesNotExist:
        return Response(
            {"detail": "Student profile not found. Complete your assessment form."},
            status=400
        )

    # 2) Look for a recent question set (last 24 hours)
    cutoff = timezone.now() - timedelta(hours=24)
    recent_qs = GeneratedQuestionSet.objects.filter(
        student=user,
        created_at__gte=cutoff
    ).order_by("-created_at").first()

    if recent_qs:
        return Response(GeneratedQuestionSetSerializer(recent_qs).data)

    # 3) No recent set → generate new via OpenAI
    prompt = (
        f"Create a reading passage suitable for a {profile.reading_level.lower()}‐level student "
        f"in {profile.age_or_grade}. "
        f"Include about "
        f"{'50–100 words' if profile.preferred_length == 'Short' else '100–200 words' if profile.preferred_length == 'Medium' else '200+ words'}; "
        f"focus on topics related to {profile.favorite_subjects}. "
        f"Make sure content is appropriate if the student finds "
        f"{profile.challenging_areas or 'no particular challenges'}. "
        f"Use a {profile.fiction_preference.lower()} style. "
        f"Generate exactly 3 comprehension questions at the end in JSON format like "
        f"[{{'q': 'question text', 'a': 'answer text'}}, ...]."
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an educational assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=300,
            n=1,
        )
        text = response.choices[0].message.content.strip()
        data = json.loads(text)
        passage_text = data.get("passage") or data.get("paragraph") or ""
        questions = data.get("questions", [])
    except Exception as e:
        return Response(
            {"detail": "OpenAI generation failed", "error": str(e)},
            status=500
        )

    new_qs = GeneratedQuestionSet.objects.create(
        student=user,
        prompt_genre=", ".join(profile.favorite_subjects.split(","))[:50],
        prompt_reading_level=profile.reading_level,
        prompt_preferred_length=profile.preferred_length,
        prompt_fiction_pref=profile.fiction_preference,
        passage_text=passage_text,
        questions=questions
    )
    return Response(GeneratedQuestionSetSerializer(new_qs).data)
