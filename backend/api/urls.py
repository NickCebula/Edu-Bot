from django.urls import path
from .views import (
    get_student_profile, upsert_student_profile, get_or_generate_questions, next_question, generate_reading_question,
    latest_reading, reading_quiz, register, student_info, student_question
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path("questions/next/", next_question),
]

urlpatterns += [
  path("token/",   TokenObtainPairView.as_view(), name="token_obtain_pair"),
  path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
  path('generate-reading/', generate_reading_question, name='generate-reading'),
  path('api/generate-question/', generate_reading_question, name='generate-question'),
  path("reading/latest/", latest_reading, name="latest-reading"),
  path("reading/quiz/", reading_quiz, name="reading-quiz"),
  path("profile/", get_student_profile, name="get_profile"),
  path("profile/update/", upsert_student_profile, name="upsert_profile"),
  path("reading/", get_or_generate_questions, name="get_or_generate_questions"),
  path("register", register, name="register"),
  path("api/register", register, name="api-register"),
  path("student-info", student_info, name="student-info"),
  path("student-question", student_question, name="student-question"),

]
