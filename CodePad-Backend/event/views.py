from .models import Event
from django.utils import timezone
from django.db.models import F
from .serializers import Event_List_Serializer, Event_Details_Serializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated


class Event_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all().order_by('-datetime')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return Event_Details_Serializer
        return Event_List_Serializer
