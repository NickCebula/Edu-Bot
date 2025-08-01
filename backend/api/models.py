from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    state = models.CharField(max_length=100)
    favorite_subject = models.CharField(max_length=100)
    favorite_hobby = models.CharField(max_length=100)
    math_questions_answered = models.PositiveIntegerField(default=0)
    reading_questions_answered = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s profile"

class ReadingPassage(models.Model):
    genre = models.CharField(max_length=50, default="General")
    passage_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.genre} passage #{self.id}"


class Question(models.Model):
    subject = models.CharField(max_length=100, blank=True, null=True)
    prompt = models.TextField(blank=True, null=True)  # The question text
    option_a = models.CharField(max_length=200, blank=True, null=True)
    option_b = models.CharField(max_length=200, blank=True, null=True)
    option_c = models.CharField(max_length=200, blank=True, null=True)
    option_d = models.CharField(max_length=200, blank=True, null=True)
    correct_answer = models.CharField(max_length=1, blank=True, null=True)  # A/B/C/D
    passage = models.ForeignKey(ReadingPassage, on_delete=models.CASCADE, related_name='questions', null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt or "(blank question)"

class MathQuestion(models.Model):
    question = models.CharField(max_length=100, blank=True, null=True)  # The math question text
    answer_text = models.CharField(max_length=100, blank=True, null=True)  # Textual answer
    answer_num = models.CharField(max_length=20, blank=True, null=True)  # Numerical answer
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.prompt or "(blank math question)"
    
class SpellingQuestion(models.Model):
    word = models.CharField(max_length=64)
    image_url = models.URLField(max_length=1000, blank=True, null=True)
    audio_url = models.URLField(max_length=1000, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word