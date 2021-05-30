from os import environ
from django.db.models import F
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Event, Problem, Submission, Leaderboard
from .serializers import Event_List_Serializer, Event_Details_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Detail_Serializer, Submission_List_Serializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from judge0api.client import Client
from judge0api.submission import submit


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
        submitted_solution = str(get_submission_data('solution'))
        testcases_input_file = problem.solution_input.open(mode='r')
        testcases_input = str(testcases_input_file.read())
        testcases_input_file.close()
        testcases_output_file = problem.solution_output.open(mode='r')
        testcases_output = str(testcases_output_file.read())
        testcases_output_file.close()

        client = Client(environ['JUDGE_HOST'])
        submission = submit(client=client, source_code=submitted_solution.encode('ascii'), language=language_id, stdin=testcases_input.encode('ascii'), expected_output=testcases_output.encode('ascii'))
        
        if submission.status['id'] == 3:
            current_event = problem.event
            if current_event.datetime <= timezone.now() <= (current_event.datetime+current_event.duration) and current_event.is_contest:
                current_leaderboard_field = Leaderboard.objects.get_or_create(user=request.user, event=current_event)[0]
                accepted_submissions = Submission.objects.filter(user=request.user, is_accepted=True, problem=problem)
                if not accepted_submissions:
                    current_leaderboard_field.score += 1
                    current_leaderboard_field.save()
            accepted = True
        else:
            accepted = False
        
        Submission.objects.create(user=request.user, problem=problem, submission_token=submission.token, solution=submitted_solution, is_accepted=accepted)

        custom_response = {
            "stdout": submission.stdout,
            "time": submission.time,
            "memory": submission.memory,
            "stderr": submission.stderr,
            "token": submission.token,
            "compile_output": submission.compile_output,
            "message": submission.message,
            "status": {
                "id": submission.status['id'],
                "description": submission.status['description']
            }
        }

        return Response(data=custom_response)


class Problem_Viewset(ReadOnlyModelViewSet):
    queryset = Problem.objects.filter(event__datetime__lt=timezone.now()).order_by('-event__datetime')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return Problem_Detail_Serializer
        return Problem_List_Serializer


class Event_Viewset(ReadOnlyModelViewSet):
    queryset = Event.objects.all().order_by('-datetime')
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            event = self.get_object()
            if timezone.localtime(event.datetime) < timezone.now():
                return Event_Details_Serializer
        return Event_List_Serializer
