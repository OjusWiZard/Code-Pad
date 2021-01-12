from rest_framework import serializers
from .models import Event, Leaderboard, Problem, Submission
from account.serializers import User_Serializer


class Submission_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    class Meta:
        model = Submission
        fields = ['user', 'problem', 'datetime', 'result_score', 'time_while_ran', 'memory_while_ran', 'language', 'solution']


class Problem_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = ['title','url']


class Problem_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    submissions = Submission_Serializer(many=True, read_only=True)
    class Meta:
        model = Problem
        fields = ['title', 'problem_statement', 'input_statement', 'output_statement', 'contraints', 'example_input', 'example_output', 'example_explanation', 'submissions']


class Event_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        exclude = ['description', 'is_contest', 'leaderboard']


class Event_Details_Serializer(serializers.HyperlinkedModelSerializer):
    problem_set = Problem_List_Serializer(many=True)
    class Meta:
        model = Event
        fields = ['title', 'description', 'is_contest', 'datetime', 'duration', 'problem_set']