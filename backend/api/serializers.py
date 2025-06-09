from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ReadingPassage, Question, StudentProfile

class QuestionSerializer(serializers.ModelSerializer):
    passage = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = '__all__'

    def get_passage(self, obj):
        return {"passage_text": obj.passage.passage_text} if obj.passage else None


class ReadingPassageSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = ReadingPassage
        fields = '__all__'


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ['grade', 'favorite_subject', 'notes']
