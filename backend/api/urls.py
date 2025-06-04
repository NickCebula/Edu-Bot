from django.urls import path
from .views import next_question, reading_passage, generate_reading_question, get_reading, latest_reading, reading_quiz

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("questions/next/", next_question),
]

urlpatterns += [
  path("token/",   TokenObtainPairView.as_view(), name="token_obtain_pair"),
  path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
  path('generate-reading/', generate_reading_question, name='generate-reading'),
  path('reading/', get_reading, name='get-reading'),
  path('api/generate-question/', generate_reading_question, name='generate-question'),
  path("reading/latest/", latest_reading, name="latest-reading"),
  path("reading/quiz/", reading_quiz, name="reading-quiz"),



]
