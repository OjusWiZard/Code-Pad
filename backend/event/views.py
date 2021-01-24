from django.http import Http404
from django.db.models import F
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Event, Problem, Submission, Leaderboard
from .serializers import Event_List_Serializer, Event_Details_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Detail_Serializer, Submission_List_Serializer
from ide.judge import submit_code, supported_languages
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError


class Submission_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Submission.objects.all().order_by('-datetime')
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            live_events = Event.objects.filter(datetime__lt=timezone.now()).filter(datetime__gt=timezone.now() - F('duration'))
            if not live_events:
                return Submission_Detail_Serializer
        return Submission_List_Serializer

    def create(self, request):

        def get_submission_data(key):
            try:
                return request.data[key]
            except:
                raise ValidationError(key + ' not found in the form data')

        problem = get_object_or_404(Problem, id=get_submission_data('problem_id'))
        language_id = int(get_submission_data('language_id'))
        submitted_solution = get_submission_data('solution')
        testcases_input_file = problem.solution_input.open(mode='r')
        testcases_input = testcases_input_file.read()
        testcases_input_file.close()
        testcases_output_file = problem.solution_output.open(mode='r')
        testcases_output = testcases_output_file.read()
        testcases_output_file.close()

        result, status = submit_code(language_id=language_id, program=submitted_solution, test_in=testcases_input, test_out=testcases_output)

        if result['status']['id'] == 3:
            current_event = problem.event
            if current_event.datetime <= timezone.now() <= (current_event.datetime+current_event.duration):
                current_leaderboard_field = Leaderboard.objects.get_or_create(user=request.user, event=current_event)[0]
                accepted_submissions = Submission.objects.filter(user=request.user, result_score=100, problem=problem)
                if not accepted_submissions:
                    current_leaderboard_field.score += 1
                    current_leaderboard_field.save()
            score = 100
        else:
            score = 0
        
        Submission.objects.create(user=request.user, problem=problem, submission_token=result['token'], solution=submitted_solution)

        return Response(data=result, status=status)


class Problem_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Problem.objects.filter(event__datetime__lt=timezone.now()).order_by('-event__datetime')

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
