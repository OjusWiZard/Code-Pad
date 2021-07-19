from django.http.response import HttpResponseRedirect
from django.urls import include, path
from rest_framework import routers

from .views import (
    Event_Viewset,
    Leaderboard_Viewset,
    Problem_Viewset,
    Submission_Viewset,
    View_Submission_Viewset,
    index,
)

routers = routers.DefaultRouter()
routers.register("events", Event_Viewset)
routers.register("problems", Problem_Viewset)
routers.register("submissions", Submission_Viewset)
routers.register("viewsubmission", View_Submission_Viewset)
routers.register("leaderboard", Leaderboard_Viewset)

urlpatterns = [
    path("", index, name="index"),
    path("", include(routers.urls)),
]
