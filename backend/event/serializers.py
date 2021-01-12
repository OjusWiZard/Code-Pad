from rest_framework import serializers
from .models import Event, Leaderboard, Problem, Submission


class Submission_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'


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