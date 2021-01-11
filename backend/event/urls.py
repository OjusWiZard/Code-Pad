from django.urls import path, include
from rest_framework import routers
from .views import Event_Viewset, Problem_Viewset

routers = routers.DefaultRouter()
routers.register(r'events', Event_Viewset)
routers.register(r'problem', Problem_Viewset)

urlpatterns = [
    path('', include(routers.urls)),
]
