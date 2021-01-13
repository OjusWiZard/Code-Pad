from django.db.models import F
from django.utils import timezone
from .models import Event, Problem, Submission
from .serializers import Event_List_Serializer, Event_Details_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Detail_Serializer, Submission_List_Serializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated


class Submission_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Submission.objects.all().order_by('-datetime')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            live_events = Event.objects.filter(datetime__lt=timezone.now()).filter(datetime__gt=timezone.now() - F('duration'))
            if not live_events:
                return Submission_Detail_Serializer
        return Submission_List_Serializer


class Problem_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Problem.objects.all().order_by('-event__datetime')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return Problem_Detail_Serializer
        return Problem_List_Serializer


class Event_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all().order_by('-datetime')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            event = self.get_object()
            if timezone.localtime(event.datetime) < timezone.now():
                return Event_Details_Serializer
        return Event_List_Serializer
