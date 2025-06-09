from rest_framework import serializers
from .models import ReadingPassage, Question

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

from .models import StudentProfile

from rest_framework import serializers
from .models import StudentProfile, GeneratedQuestionSet

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "full_name",
            "age_or_grade",
            "reading_level",
            "favorite_subjects",
            "challenging_areas",
            "learning_styles",
            "preferred_length",
            "interests",
            "fiction_preference",
            "additional_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class GeneratedQuestionSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedQuestionSet
        fields = [
            "id",
            "student",
            "created_at",
            "prompt_genre",
            "prompt_reading_level",
            "prompt_preferred_length",
            "prompt_fiction_pref",
            "passage_text",
            "questions",
        ]
        read_only_fields = ["id", "student", "created_at"]
