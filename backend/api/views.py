from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Question, ReadingPassage, MathQuestion
from .serializers import QuestionSerializer, ReadingPassageSerializer
from .reading import generate_reading_data, save_reading_to_db
from .math import generate_math_data, save_math_to_db

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