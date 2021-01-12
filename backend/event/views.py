from .models import Event, Problem, Submission
from .serializers import Event_List_Serializer, Event_Details_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Serializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated


class Submission_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Submission.objects.all().order_by('-datetime')
    serializer_class = Submission_Serializer


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
            return Event_Details_Serializer
        return Event_List_Serializer
