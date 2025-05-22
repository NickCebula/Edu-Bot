from django.urls import path
from .views import next_question

urlpatterns = [
    path("questions/next/", next_question),
]

