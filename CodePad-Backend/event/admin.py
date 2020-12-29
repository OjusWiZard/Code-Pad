from django.contrib import admin
from django.apps import apps
from .models import Event, Leaderboard, Problem, Submission

apps.get_model('auth.Group')._meta.app_label = 'account'
admin.site.register(Event)
admin.site.register(Leaderboard)
admin.site.register(Problem)
admin.site.register(Submission)