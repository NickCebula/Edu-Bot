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
    
# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User

class StudentProfile(models.Model):
    """
    One-to-one with User. Captures age/grade, reading level, interests, etc.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="student_profile"
    )

    full_name         = models.CharField(max_length=100)
    age_or_grade      = models.CharField(max_length=100, help_text="E.g. '8', '3rd grade', etc.")
    reading_level     = models.CharField(
        max_length=20,
        choices=[
            ("Beginner", "Beginner"),
            ("Intermediate", "Intermediate"),
            ("Advanced", "Advanced"),
        ]
    )
    favorite_subjects = models.CharField(
        max_length=200,
        help_text="Comma-separated list of favorite topics, e.g. 'Animals, Space'."
    )
    challenging_areas = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated list of areas student finds challenging."
    )
    learning_styles   = models.CharField(
        max_length=100,
        help_text="Comma-separated: Visual, Auditory, Kinesthetic, Verbal."
    )
    preferred_length  = models.CharField(
        max_length=20,
        choices=[
            ("Short", "Short (50–100 words)"),
            ("Medium", "Medium (100–200 words)"),
            ("Long", "Long (200+ words)"),
        ]
    )
    interests         = models.CharField(
        max_length=200,
        blank=True,
        help_text="Comma-separated hobbies, e.g. 'Soccer, Drawing'."
    )
    fiction_preference = models.CharField(
        max_length=20,
        choices=[
            ("Fiction", "Fiction"),
            ("Non-fiction", "Non-fiction"),
            ("Both", "Both / No preference"),
        ]
    )
    additional_notes  = models.TextField(max_length=255, blank=True)
    created_at        = models.DateTimeField(auto_now_add=True)
    updated_at        = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.user.username})"


class GeneratedQuestionSet(models.Model):
    """
    Each time we auto-generate a batch of questions for a student,
    we store:
      - which student (FK to User or StudentProfile)
      - when it was generated
      - what prompt‐parameters were used
      - the questions themselves (JSON list)
    """
    student         = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="question_sets"
    )
    created_at      = models.DateTimeField(auto_now_add=True)

    # We can echo back exactly how we prompted OpenAI (e.g. genre, level, etc.)
    prompt_genre            = models.CharField(max_length=50)
    prompt_reading_level    = models.CharField(max_length=20)
    prompt_preferred_length = models.CharField(max_length=20)
    prompt_fiction_pref     = models.CharField(max_length=20)

    # Store the generated passage text if you like, or skip if you only want questions
    passage_text    = models.TextField(blank=True)

    # Store an array of { "q": "...", "a": "..." } objects
    questions       = models.JSONField(default=list)

    def __str__(self):
        return f"Questions for {self.student.username} on {self.created_at:%Y-%m-%d %H:%M}"

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    grade = models.CharField(max_length=100, blank=True)
    favorite_subject = models.CharField(max_length=50, blank=True)
    notes = models.TextField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile for {self.user.username}"