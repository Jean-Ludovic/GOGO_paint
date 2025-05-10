from django.urls import path
from .views import CustomAuthToken, SignupView

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
]
