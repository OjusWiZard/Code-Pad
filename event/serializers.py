from django.utils import timezone
from rest_framework import serializers
from .models import Event, Leaderboard, Problem, Submission
from account.serializers import User_Serializer


class Problem_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = ['title', 'url']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class Submission_List_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    problem = Problem_List_Serializer()
    class Meta:
        model = Submission
        fields = ['url', 'user', 'problem', 'datetime']


class Submission_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    problem = Problem_List_Serializer()
    class Meta:
        model = Submission
        fields = ['user', 'problem', 'datetime', 'solution']


class Problem_Detail_Serializer(serializers.HyperlinkedModelSerializer):
    submissions = Submission_List_Serializer(many=True, read_only=True)
    class Meta:
        model = Problem
        fields = ['id', 'title', 'problem_statement', 'input_statement', 'output_statement', 'contraints', 'example_input', 'example_output', 'example_explanation', 'submissions']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class Leaderboard_Serializer(serializers.HyperlinkedModelSerializer):
    user = User_Serializer()
    class Meta:
        model = Leaderboard
        fields = ['user', 'score']


class Event_List_Serializer(serializers.HyperlinkedModelSerializer):

    status = serializers.SerializerMethodField('event_status')

    def event_status(self, event):
        if timezone.now() < event.datetime:
            return 'Upcoming'
        elif timezone.now() <= event.datetime+event.duration:
            return 'Ongoing'
        else:
            return 'Past'

    class Meta:
        model = Event
        exclude = ['description', 'is_contest', 'leaderboard', 'slug']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }


class Event_Details_Serializer(serializers.HyperlinkedModelSerializer):
    problem_set = Problem_List_Serializer(many=True)
    leaderboard_of_this_event = Leaderboard_Serializer(many=True)
    status = serializers.SerializerMethodField('event_status')

    def event_status(self, event):
        if timezone.now() < event.datetime:
            return 'Upcoming'
        elif timezone.now() <= event.datetime+event.duration:
            return 'Ongoing'
        else:
            return 'Past'

    class Meta:
        model = Event
        fields = ['title', 'description', 'is_contest', 'status', 'datetime', 'duration', 'problem_set', 'leaderboard_of_this_event']
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }