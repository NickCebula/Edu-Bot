from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from .models import Question, ReadingPassage, StudentProfile
from .serializers import QuestionSerializer, ReadingPassageSerializer, StudentProfileSerializer
from .reading import generate_reading_data, save_reading_to_db

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


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    if not username or not password:
        return Response({"success": False, "message": "Missing credentials"})
    if User.objects.filter(username=username).exists():
        return Response({"success": False, "message": "Username taken"})

    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "message": "Registered",
        "user_id": user.id,
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


@csrf_exempt
@api_view(["POST"])
def student_info(request):
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required"}, status=401)
    serializer = StudentProfileSerializer(data=request.data)
    if serializer.is_valid():
        profile, _ = StudentProfile.objects.update_or_create(user=request.user, defaults=serializer.validated_data)
        return Response({"success": True})
    return Response(serializer.errors, status=400)


def generate_student_question_text(profile):
    prompt = (
        f"Create a single short quiz question suitable for a student in grade {profile.grade}. "
        f"Tailor it to the student's favourite subject {profile.favorite_subject}. "
        "Provide four multiple choice options labeled A-D and indicate the correct letter. "
        "Return ONLY JSON in the format: {\"question\":..., \"options\":[...], \"answer\":\"A\"}"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()


@api_view(["GET"])
def student_question(request):
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required"}, status=401)
    try:
        profile = request.user.profile
    except StudentProfile.DoesNotExist:
        return Response({"detail": "Profile missing"}, status=404)
    result = generate_student_question_text(profile)
    return Response({"question": result})

