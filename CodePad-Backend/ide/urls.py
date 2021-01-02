from django.urls import path, include
from rest_framework import routers
from .views import Submit_Code

code_routers = routers.DefaultRouter()
code_routers.register(r'submit', Submit_Code, basename='submit_code')

urlpatterns = [
    path('', include(code_routers.urls)),
]
