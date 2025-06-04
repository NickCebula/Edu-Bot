from django.db import models

class Question(models.Model):
    subject = models.CharField(max_length=100)
    prompt  = models.TextField()
    # ... other fields ...

class ReadingPassage(models.Model):
    genre        = models.CharField(max_length=50, default="General")
    passage_text = models.TextField()
    questions    = models.JSONField(default=list)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.genre} passage #{self.id}"
