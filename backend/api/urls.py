from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    next_question, reading_passage, generate_reading_question, get_reading, latest_reading,
    reading_quiz, generate_math_question, math_quiz,
    generate_spelling_question, spelling_quiz, register_user, get_profile
)
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
    path("math/generate/", generate_math_question, name="generate-math-question"),
    path("math/quiz/", math_quiz, name="math-quiz"),
    path("spelling/generate/", generate_spelling_question, name="generate-spelling-question"),
    path("spelling/quiz/", spelling_quiz, name="spelling-quiz"),
    path("register/", register_user, name="register_user"),
    path("profile/", get_profile, name="get_profile"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)