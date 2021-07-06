from django.urls import include, path
from rest_framework import routers

from .views import (Event_Viewset, Leaderboard_Viewset, Problem_Viewset,
                    Submission_Viewset, View_Submission_Viewset)

routers = routers.DefaultRouter()
routers.register(r"events", Event_Viewset)
routers.register(r"problems", Problem_Viewset)
routers.register(r"submissions", Submission_Viewset)
routers.register(r"viewsubmission", View_Submission_Viewset)
routers.register(r"leaderboard", Leaderboard_Viewset)

urlpatterns = [
    path("", include(routers.urls)),
]
