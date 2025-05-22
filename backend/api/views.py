from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer

@api_view(["GET"])
def next_question(request):
    subject = request.query_params.get("subject")
    q = Question.objects.filter(subject=subject).first()
    return Response(QuestionSerializer(q).data)

@api_view(["GET"])
def home(request):
    return Response({"message": "Welcome to the API!"})
