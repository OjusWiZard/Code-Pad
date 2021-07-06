from django.contrib import admin

from .models import Event, Leaderboard, Problem, Submission, Testcase
from .tasks import submit


class Event_Admin(admin.ModelAdmin):
    list_display = ["title", "is_contest", "datetime", "duration"]
    list_filter = ["is_contest"]
    ordering = ["-datetime"]
    search_fields = ["title"]


class Leaderboard_Admin(admin.ModelAdmin):
    list_display = ["event", "user", "score"]
    list_filter = ["event", "user"]
    ordering = ["-event__datetime", "-score"]
    search_fields = ["user", "event"]


class Problem_Admin(admin.ModelAdmin):
    list_display = ["title", "event", "no_of_testcases"]
    list_filter = ["event"]
    ordering = ["-event__datetime"]
    search_fields = ["title"]


class Testcase_Admin(admin.ModelAdmin):
    list_filter = ["problem__title"]
    search_fields = ["problem__title"]


class Submission_Admin(admin.ModelAdmin):
    list_display = ["user", "status", "problem", "datetime"]
    list_filter = ["problem__event"]
    ordering = ["-datetime"]
    search_fields = ["user", "problem", "problem__event"]
    actions = ["evaluate"]

    def evaluate(self, request, queryset):
        queryset.order_by("datetime")
        for submission in queryset:
            problem = submission.problem
            user = submission.user
            submitted_solution = submission.solution
            language_id = submission.language_id
            submission_time = submission.datetime

            submit.delay(
                problem_id=problem.id,
                user_id=user.id,
                submission_id=submission.id,
                solution=submitted_solution,
                lang_id=language_id,
                submitting_time=submission_time,
            )


admin.site.register(Event, Event_Admin)
admin.site.register(Leaderboard, Leaderboard_Admin)
admin.site.register(Problem, Problem_Admin)
admin.site.register(Testcase, Testcase_Admin)
admin.site.register(Submission, Submission_Admin)
