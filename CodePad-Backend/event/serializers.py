from rest_framework import serializers
from .models import Event, Leaderboard, Problem, Submission


class Event_List_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        exclude = ['description', 'is_contest', 'leaderboard']


class Event_Details_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'