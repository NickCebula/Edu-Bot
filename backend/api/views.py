from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Question, ReadingPassage, MathQuestion, SpellingQuestion, UserProfile
from .serializers import QuestionSerializer, ReadingPassageSerializer, RegisterSerializer
from .reading import generate_reading_data, save_reading_to_db
from .math import generate_math_data, save_math_to_db
from .spelling import save_spelling_to_db

from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=settings.OPENAI_API_KEY)

# ----------------------------
# API Endpoints
# ----------------------------

@api_view(["GET"])
def home(request):
    return Response({"message": "Welcome to the API!"})

@api_view(["GET"])
def next_question(request):
    subject = request.query_params.get("subject")
    q = Question.objects.filter(subject=subject).first()
    if q:
        return Response(QuestionSerializer(q).data)
    return Response({"error": "No question found for this subject"}, status=404)

@api_view(["GET"])
def reading_passage(request):
    passage = ReadingPassage.objects.prefetch_related('questions').order_by('?').first()
    if not passage:
        return Response({"passage": "No passage found.", "questions": []})
    return Response(ReadingPassageSerializer(passage).data)

@csrf_exempt
@api_view(["POST"])
def generate_reading_question(request):
    data = generate_reading_data()
    if not data:
        return JsonResponse({"error": "Failed to generate valid data"}, status=500)

    saved = save_reading_to_db(data)
    return JsonResponse({"message": "Saved", "passage_id": saved.id})

@api_view(["GET"])
def get_reading(request):
    # This appears to be a dummy fallback example — consider removing it if unused
    reading_data = {
        "passage": "Example...",
        "questions": [
            {
                "question": "What is ...?",
                "options": ["A", "B", "C", "D"],
                "answer": "A"
            }
        ]
    }
    return Response(reading_data)

@api_view(["GET"])
def latest_reading(request):
    passage = ReadingPassage.objects.prefetch_related("questions").order_by("-created_at").first()
    
    if not passage:
        data = generate_reading_data()
        if not data:
            return Response({"error": "No data and generation failed"}, status=500)
        passage = save_reading_to_db(data)

    serializer = ReadingPassageSerializer(passage)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer

@api_view(["GET"])
def reading_quiz(request):
    questions = Question.objects.filter(subject="Reading").order_by('?')[:5]
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def generate_math_question(request):
    data = generate_math_data()
    if not data:
        return Response({"error": "Failed to generate"}, status=500)
    saved = save_math_to_db(data)
    return Response({"message": "Saved", "id": saved.id})

@api_view(["GET"])
def math_quiz(request):
    questions = MathQuestion.objects.order_by('?')[:5]
    # Return both text and numeric answers as a list for each question
    out = [
        {
            "id": q.id,
            "q": q.question,
            "a": [q.answer_text, q.answer_num]
        }
        for q in questions
    ]
    return Response(out)

@api_view(["POST"])
def generate_spelling_question(request):
    saved = save_spelling_to_db()
    if not saved:
        return Response({"error": "Failed to generate"}, status=500)
    return Response({"message": "Saved", "id": saved.id})

@api_view(["GET"])
def spelling_quiz(request):
    questions = SpellingQuestion.objects.order_by('?')[:5]
    out = [
        {
            "id": q.id,
            "word": q.word,
            "image_url": q.image_url,
            "audio_url": q.audio_url,
        }
        for q in questions
    ]
    return Response(out)

@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Fetch the created profile to return all profile info
        profile = UserProfile.objects.get(user=user)
        profile_data = {
            "username": user.username,
            "email": user.email,
            "name": profile.name,
            "age": profile.age,
            "state": profile.state,
            "favorite_subject": profile.favorite_subject,
            "favorite_hobby": profile.favorite_hobby,
        }
        return Response(
            {"message": "User created successfully", "user_id": user.id, "profile": profile_data},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
        profile_data = {
            "username": user.username,
            "email": user.email,
            "name": profile.name,
            "age": profile.age,
            "state": profile.state,
            "favorite_subject": profile.favorite_subject,
            "favorite_hobby": profile.favorite_hobby,
        }
        return Response(profile_data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)