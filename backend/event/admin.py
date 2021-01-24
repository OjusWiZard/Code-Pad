from django.contrib import admin
from .models import Event, Leaderboard, Problem, Submission


class Event_Admin(admin.ModelAdmin):
    list_display = ['title', 'is_contest', 'datetime', 'duration']
    list_filter = ['is_contest']
    ordering = ['-datetime']
    search_fields = ['title']


class Leaderboard_Admin(admin.ModelAdmin):
    list_display = ['event', 'user', 'score']
    list_filter = ['event', 'user']
    ordering = ['-event__datetime', '-score']
    search_fields = ['user', 'event']
    readonly_fields = ['event', 'user', 'score']


class Problem_Admin(admin.ModelAdmin):
    list_display = ['title', 'event']
    ordering = ['-event__datetime']
    search_fields = ['title']


class Submission_Admin(admin.ModelAdmin):
    list_display = ['user', 'problem', 'datetime', 'submission_token']
    list_filter = ['problem__event']
    ordering = ['-datetime']
    search_fields = ['user', 'problem', 'problem__event']
    readonly_fields = ['datetime', 'solution', 'user', 'problem', 'submission_token']


admin.site.register(Event, Event_Admin)
admin.site.register(Leaderboard, Leaderboard_Admin)
admin.site.register(Problem, Problem_Admin)
admin.site.register(Submission, Submission_Admin)