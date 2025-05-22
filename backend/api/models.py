from django.db import models

class Question(models.Model):
    SUBJECT_CHOICES = [
        ("math","Math"), ("reading","Reading"), ("spelling","Spelling")
    ]
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    prompt  = models.TextField()
    answer  = models.CharField(max_length=200)
