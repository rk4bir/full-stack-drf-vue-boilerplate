from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

from .views import Retrieve, Update


app_name = "account.v1"

urlpatterns = [
    # account routes
    path("<str:username>/", Retrieve.as_view(), name="retrieve"),
    path("<str:username>/update/", Update.as_view(), name="update"),
    # token routes
    path("token/both/", TokenObtainPairView.as_view(), name='token-both'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),
]
