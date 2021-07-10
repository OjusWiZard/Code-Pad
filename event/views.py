from datetime import timedelta
from os import environ

from django.db.models import F
from django.http.response import HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Event, Leaderboard, Problem, Submission
from .paginations import Pagination_Size10
from .serializers import (
    Event_Details_Serializer,
    Event_List_Serializer,
    Leaderboard_Serializer,
    Problem_Detail_Serializer,
    Problem_List_Serializer,
    Submission_Detail_Serializer,
    Submission_List_Serializer,
)
from .tasks import submit


class Submission_Viewset(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = Submission_List_Serializer
    queryset = Submission.objects.all().order_by("-datetime")
    pagination_class = Pagination_Size10
    lookup_field = "problem__slug"

    def for_a_user(self):
        return "username" in self.request.query_params

    def get_queryset(self):
        queryset = Submission.objects.filter(
            problem__slug=self.kwargs[self.lookup_field]
        )
        if self.for_a_user():
            return queryset.filter(
                user__username=self.request.query_params["username"]
            ).order_by("-datetime")
        return queryset.order_by("-datetime")

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def list(self, request, *args, **kwargs):
        return HttpResponseBadRequest()

    def create(self, request):
        def get_submission_data(key):
            try:
                return request.data[key]
            except:
                raise ValidationError(key + " not found in the form data")

        problem = get_object_or_404(Problem, slug=get_submission_data("problem_slug"))
        language_id = int(get_submission_data("language_id"))
        submitted_solution = str(get_submission_data("solution"))
        current_time = timezone.now()

        ongoing_submission = Submission.objects.filter(
            user=request.user, problem=problem, status="In Queue"
        )
        ongoing_submission |= Submission.objects.filter(
            user=request.user, problem=problem, status="Processing"
        )
        very_frequent_submission = ongoing_submission.filter(
            datetime__gt=current_time - timedelta(minutes=5)
        )

        if very_frequent_submission.count() > 0:
            return Response(data="Too Frequent Submissions!!!")

        submission = Submission.objects.create(
            user=request.user,
            problem=problem,
            solution=submitted_solution,
            language_id=language_id,
            status="In Queue",
        )

        submit.delay(
            problem_id=problem.id,
            user_id=request.user.id,
            submission_id=submission.id,
            solution=submitted_solution,
            lang_id=language_id,
            submitting_time=current_time,
        )

        return Response(
            Submission_Detail_Serializer(submission, context={"request": request}).data
        )


class View_Submission_Viewset(ReadOnlyModelViewSet):
    queryset = Submission.objects.all().order_by("-datetime")
    pagination_class = Pagination_Size10

    def get_serializer_class(self):
        if self.action == "retrieve":
            submission = self.get_object()
            problem = submission.problem
            event = problem.event
            live_events = Event.objects.filter(datetime__lt=timezone.now()).filter(
                datetime__gt=timezone.now() - F("duration")
            )
            if not event in live_events:
                return Submission_Detail_Serializer
            elif self.request.user == submission.user:
                return Submission_Detail_Serializer
        return Submission_List_Serializer


class Problem_Viewset(ReadOnlyModelViewSet):
    queryset = (
        Problem.objects.filter(event__datetime__lt=timezone.now())
        .distinct()
        .order_by("-event__datetime")
    )
    lookup_field = "slug"
    pagination_class = Pagination_Size10

    def get_serializer_class(self):
        if self.action == "retrieve":
            return Problem_Detail_Serializer
        return Problem_List_Serializer


class Event_Viewset(ReadOnlyModelViewSet):
    queryset = Event.objects.all().order_by("-datetime")
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            event = self.get_object()
            if timezone.localtime(event.datetime) < timezone.now():
                return Event_Details_Serializer
        return Event_List_Serializer


class Leaderboard_Viewset(ReadOnlyModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = Leaderboard_Serializer
    pagination_class = Pagination_Size10
    lookup_field = "event__slug"

    def for_a_user(self):
        return "username" in self.request.query_params

    def get_queryset(self):
        queryset = Leaderboard.objects.filter(
            event__slug=self.kwargs[self.lookup_field]
        )
        if self.for_a_user():
            return get_object_or_404(
                queryset, user__username=self.request.query_params["username"]
            )
        return queryset.order_by("-score")

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not self.for_a_user():
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=not self.for_a_user())
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        return HttpResponseBadRequest()
