from rest_framework import serializers
from .models import Event, Leaderboard, Problem, Submission


class Problem_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = ['title','url']


class Problem_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        exclude = ['solution_input', 'solution_output', 'event', 'submission_from']


class Event_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        exclude = ['description', 'is_contest', 'leaderboard']


class Event_Details_Serializer(serializers.HyperlinkedModelSerializer):
    problem_set = Problem_List_Serializer(many=True)
    class Meta:
        model = Event
        fields = ['title', 'description', 'is_contest', 'datetime', 'duration', 'problem_set']