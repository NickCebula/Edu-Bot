from rest_framework import serializers
from .models import Question, ReadingPassage

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Question
        fields = ["id", "subject", "prompt"]  # whatever fields you need

class ReadingPassageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ReadingPassage
        fields = ["id", "genre", "passage_text", "questions", "created_at"]
