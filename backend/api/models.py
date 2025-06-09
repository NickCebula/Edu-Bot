from django.db import models
from django.contrib.auth.models import User

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


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    grade = models.CharField(max_length=20)
    favorite_subject = models.CharField(max_length=50, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile for {self.user.username}"
