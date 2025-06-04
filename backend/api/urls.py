from django.urls import path
from .views import next_question, reading_passage
#from .views import generate_question

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("questions/next/", next_question),
]

urlpatterns += [
  path("token/",   TokenObtainPairView.as_view(), name="token_obtain_pair"),
  path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
  path("reading/", reading_passage),
]


# urlpatterns = [
#     path('api/generate-question/', generate_question, name='generate-question'),
# ]