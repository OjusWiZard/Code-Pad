from os import environ
from django.db.models import F
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from judge0api.client import Client
from judge0api.submission import submit
from .paginations import Pagination_Size10
from .models import Event, Problem, Submission, Leaderboard
from .serializers import Event_List_Serializer, Event_Details_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Detail_Serializer, Submission_List_Serializer


class Submission_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Submission.objects.all().order_by('-datetime')
    pagination_class = Pagination_Size10
    
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
        submitted_solution = str(get_submission_data('solution')).encode('ascii')
        testcases_input_file = problem.solution_input.open(mode='r')
        testcases_input = str(testcases_input_file.read()).encode('ascii')
        testcases_input_file.close()
        testcases_output_file = problem.solution_output.open(mode='r')
        testcases_output = str(testcases_output_file.read()).encode('ascii')
        testcases_output_file.close()

        def time_limit(lang_id):
            if lang_id in (70, 71):                 # [Python, Python3]
                return 5.5
            elif lang_id in (55, 68, 72):           # [Lisp, PHP, Ruby]
                return 3.5
            elif lang_id in (51, 62, 63, 78, 81):   # [C#, Java, javaScript, Kotlin, Scala]
                return 2.5
            else:                                   # All other Languages
                return 1.5

        client = Client(environ['JUDGE_HOST'], environ['X_Auth_Token'])
        submission = submit(client=client, source_code=submitted_solution, language=language_id, stdin=testcases_input, expected_output=testcases_output, cpu_time_limit=time_limit(language_id))
        
        current_event = problem.event
        current_time = timezone.now()
        if current_event.datetime <= current_time <= (current_event.datetime+current_event.duration) and current_event.is_contest:
            submissions = Submission.objects.filter(user=request.user, problem=problem)
            correct_submissions = submissions.filter(is_accepted=True)
            if not correct_submissions and submission.status['id'] == 3:
                incorrect_submissions = submissions.filter(is_accepted=False)
                current_leaderboard_field = Leaderboard.objects.get_or_create(user=request.user, event=current_event)[0]
                current_leaderboard_field.score += problem.points
                current_leaderboard_field.score -= problem.penalty * incorrect_submissions.count()
                current_leaderboard_field.score -= problem.point_loss * (current_time.minute - current_event.datetime.minute)
                current_leaderboard_field.save()

        accepted = submission.status['id'] == 3
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
    pagination_class = Pagination_Size10

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
