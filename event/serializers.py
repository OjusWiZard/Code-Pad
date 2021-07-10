from django.utils import timezone
from rest_framework import serializers

from account.serializers import User_Serializer

from .models import Event, Leaderboard, Problem, Submission


class Problem_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = ["slug", "title", "url", "points"]
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class Submission_List_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    problem = Problem_List_Serializer()

    class Meta:
        model = Submission
        fields = [
            "id",
            "url",
            "user",
            "status",
            "testcases_passed",
            "problem",
            "datetime",
        ]


class Submission_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    problem = Problem_List_Serializer()

    class Meta:
        model = Submission
        fields = [
            "id",
            "url",
            "user",
            "status",
            "testcases_passed",
            "problem",
            "datetime",
            "solution",
        ]


class Problem_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = [
            "id",
            "slug",
            "title",
            "points",
            "penalty",
            "point_loss",
            "problem_statement",
            "input_statement",
            "output_statement",
            "contraints",
            "example_input",
            "example_output",
            "example_explanation",
            "no_of_testcases",
        ]
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class Leaderboard_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()

    class Meta:
        model = Leaderboard
        fields = ["user", "score"]


class Event_List_Serializer(serializers.HyperlinkedModelSerializer):
    status = serializers.SerializerMethodField("event_status")
    endtime = serializers.SerializerMethodField("get_endtime")

    def event_status(self, event):
        if timezone.now() < event.datetime:
            return "Upcoming"
        elif timezone.now() <= event.datetime + event.duration:
            return "Ongoing"
        else:
            return "Past"

    def get_endtime(self, event):
        return timezone.localtime(event.datetime + event.duration)

    class Meta:
        model = Event
        exclude = ["leaderboard"]
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class Event_Details_Serializer(serializers.HyperlinkedModelSerializer):
    problem_set = serializers.SerializerMethodField("get_problem_set")
    status = serializers.SerializerMethodField("event_status")
    endtime = serializers.SerializerMethodField("get_endtime")

    def get_problem_set(self, event):
        problems = event.problem_set.order_by("points")
        return Problem_List_Serializer(
            problems, context={"request": self.context["request"]}, many=True
        ).data

    def event_status(self, event):
        if timezone.now() < event.datetime:
            return "Upcoming"
        elif timezone.now() <= event.datetime + event.duration:
            return "Ongoing"
        else:
            return "Past"

    def get_endtime(self, event):
        return timezone.localtime(event.datetime + event.duration)

    class Meta:
        model = Event
        fields = [
            "title",
            "description",
            "rules",
            "is_contest",
            "icon",
            "status",
            "endtime",
            "datetime",
            "duration",
            "problem_set",
        ]
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}
