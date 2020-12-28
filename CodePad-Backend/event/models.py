from django.db import models
from django.utils.timezone import timedelta
from account.models import User


class Event(models.Model):
    title       = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    is_contest  = models.BooleanField(default=True)
    datetime    = models.DateTimeField(auto_now=False)
    duration    = models.DurationField(default=timedelta(hours=2))
    
    leaderboard = models.ManyToManyField(User, through='Leaderboard')
    
    def __str__(self):
        return self.title


class Leaderboard(models.Model):
    score       = models.IntegerField(default=0)
    
    user        = models.ForeignKey(User)
    event       = models.ForeignKey(Event)
    
    def __str__(self):
        return self.user + " in " + self.event


class Problem(models.Model):
    title               = models.CharField(max_length=32)
    problem_statement   = models.TextField(max_lenght=2048)
    input_statement     = models.TextField(max_length=1024)
    output_statement    = models.TextField(max_length=1024)
    contraints          = models.TextField(max_length=1024)
    example_input       = models.TextField(max_length=512)
    example_output      = models.TextField(max_length=512)
    example_explanation = models.TextField(max_length=1024)
    solution_input      = models.TextField(max_length=4096)
    solution_output     = models.TextField(max_length=4096)

    event               = models.ForeignKey(Event)
    submission_from     = models.ManyToManyField(User, through='Submission')
    
    def __str__(self):
        return self.title


class Submission(models.Model):
    datetime            = models.DateTimeField(auto_now_add=True, auto_created=True)
    result_score        = models.IntegerField()
    time_while_ran      = models.FloatField()
    memory_while_ran    = models.FloatField()
    language            = models.CharField(max_length=16)
    solution            = models.TextField(max_length=4096)

    user                = models.ForeignKey(User)
    problem             = models.ForeignKey(Problem)
    
    def __str__(self):
        return self.user.username + "'s " + self.problem.title