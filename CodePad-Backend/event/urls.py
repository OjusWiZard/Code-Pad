from django.urls import path, include
from rest_framework import routers
from .views import Event_Viewset

routers = routers.DefaultRouter()
routers.register(r'', Event_Viewset)

urlpatterns = [
    path('', include(routers.urls)),
]
