from os import environ
from copy import deepcopy
from django.db.models import F
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http.response import HttpResponseBadRequest
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from judge0api.client import Client
from .judge import SingleSubmission
from .paginations import Pagination_Size10
from .models import Event, Problem, Testcase, Submission, Leaderboard
from .serializers import Event_List_Serializer, Event_Details_Serializer, Leaderboard_Serializer, Problem_List_Serializer, Problem_Detail_Serializer, Submission_Detail_Serializer, Submission_List_Serializer


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

        problem = get_object_or_404(Problem, slug=get_submission_data('problem_slug'))
        language_id = int(get_submission_data('language_id'))
        submitted_solution = str(get_submission_data('solution'))
        testcases = Testcase.objects.filter(problem=problem)

        def time_limit(lang_id):
            if lang_id in (70, 71):                 # [Python, Python3]
                return 10
            elif lang_id in (55, 68, 72):           # [Lisp, PHP, Ruby]
                return 6
            elif lang_id in (51, 62, 63, 78, 81):   # [C#, Java, javaScript, Kotlin, Scala]
                return 4
            else:                                   # All other Languages
                return 2

        client = Client(environ['JUDGE_HOST'], environ['X_Auth_Token'])
        results = []
        passed = True
        for testcase in testcases:
            tc_inp_file = testcase.tc_input.open(mode='r')
            tc_out_file = testcase.tc_output.open(mode='r')
            tc_out = str(tc_out_file.read().decode())
            tc_inp = str(tc_inp_file.read().decode())
            tc_inp_file.close()
            tc_out_file.close()

            submission = SingleSubmission(source_code=submitted_solution, language_id=language_id, stdin=tc_inp, expected_output=tc_out, cpu_time_limit=time_limit(language_id))
            result = submission.submit(client)
            results.append(deepcopy(result))

            if result.status['id'] != 3:
                passed = False
                break

        current_event = problem.event
        current_time = timezone.now()
        if current_event.datetime <= current_time <= (current_event.datetime+current_event.duration) and current_event.is_contest:
            submissions = Submission.objects.filter(user=request.user, problem=problem)
            correct_submissions = submissions.filter(is_accepted=True)
            if not correct_submissions and passed:
                incorrect_submissions = submissions.filter(is_accepted=False)
                current_leaderboard_field = Leaderboard.objects.get_or_create(user=request.user, event=current_event)[0]
                current_leaderboard_field.score += problem.points
                current_leaderboard_field.score -= problem.penalty * incorrect_submissions.count()
                current_leaderboard_field.score -= problem.point_loss * (current_time.minute - current_event.datetime.minute)
                current_leaderboard_field.save()

        Submission.objects.create(user=request.user, problem=problem, solution=submitted_solution, is_accepted=passed)

        avg_time = 0
        avg_memory = 0
        testcases = []
        status = ['failed', 'passed']

        for result in results:
            avg_time += float(result.time)
            avg_memory += float(result.memory)
            testcase = {
                "time": float(result.time),
                "memory": float(result.memory),
                "stderr": result.stderr,
                "token": result.token,
                "compile_output": result.compile_output,
                "message": result.message,
                "status": {
                    "id": result.status['id'],
                    "description": result.status['description']
                }
            }
            testcases.append(testcase)
        avg_time /= len(testcases)
        avg_memory /= len(testcases)

        custom_response = {
            'complete_status': status[passed],
            'avg_time': avg_time,
            'avg_memory': avg_memory,
            'testcases': testcases
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


class Leaderboard_Viewset(ReadOnlyModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = Leaderboard_Serializer
    pagination_class = Pagination_Size10
    lookup_field = 'event__slug'

    def for_a_user(self):
        return 'username' in self.request.query_params

    def get_queryset(self):
        queryset = Leaderboard.objects.filter(event__slug=self.kwargs[self.lookup_field])
        if self.for_a_user():
            return get_object_or_404(queryset, user__username=self.request.query_params['username'])
        return queryset

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not self.for_a_user():
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many= not self.for_a_user())
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        return HttpResponseBadRequest()
