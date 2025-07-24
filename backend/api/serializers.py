from rest_framework import serializers
from .models import ReadingPassage, Question, UserProfile
from django.contrib.auth.models import User

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

class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    state = serializers.CharField(write_only=True)
    favorite_subject = serializers.CharField(write_only=True)
    favorite_hobby = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password1', 'password2',
            'name', 'age', 'state', 'favorite_subject', 'favorite_hobby'
        ]

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )
        UserProfile.objects.create(
            user=user,
            name=validated_data['name'],
            age=validated_data['age'],
            state=validated_data['state'],
            favorite_subject=validated_data['favorite_subject'],
            favorite_hobby=validated_data['favorite_hobby']
        )
        return user