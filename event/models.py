from django.db import models
from django.utils.timezone import timedelta
from account.models import User
from .validators import validate_text_file


class Event(models.Model):
    slug        = models.SlugField(max_length=8, unique=True)
    title       = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    is_contest  = models.BooleanField(default=True)
    icon        = models.ImageField(upload_to='event_icons/')
    datetime    = models.DateTimeField(auto_now=False)
    duration    = models.DurationField(default=timedelta(hours=2))
    
    leaderboard = models.ManyToManyField(User, through='Leaderboard', related_name='event_of_this_leaderboard')
    
    def __str__(self):
        return self.title


class Leaderboard(models.Model):
    score       = models.IntegerField(default=0)
    
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    event       = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='leaderboard_of_this_event')
    
    def __str__(self):
        return self.user.username + " in " + self.event.title
    
    class Meta:
        ordering = ['-score']


class Problem(models.Model):
    def get_input_testcase_path(instance, filename):
        return 'testcases/{0}/input.txt'.format(instance.title)
    def get_output_testcase_path(instance, filename):
        return 'testcases/{0}/output.txt'.format(instance.title)
    
    slug                = models.SlugField(max_length=8, unique=True)
    title               = models.CharField(max_length=32)
    problem_statement   = models.TextField(max_length=2048)
    input_statement     = models.TextField(max_length=1024)
    output_statement    = models.TextField(max_length=1024)
    contraints          = models.TextField(max_length=1024, blank=True, null=True)
    example_input       = models.TextField(max_length=512, blank=True, null=True)
    example_output      = models.TextField(max_length=512, blank=True, null=True)
    example_explanation = models.TextField(max_length=1024, blank=True, null=True)
    solution_input      = models.FileField(upload_to=get_input_testcase_path, validators=[validate_text_file])
    solution_output     = models.FileField(upload_to=get_output_testcase_path, validators=[validate_text_file])

    event               = models.ForeignKey(Event, on_delete=models.CASCADE)
    submission_from     = models.ManyToManyField(User, through='Submission')
    
    def __str__(self):
        return self.title


class Submission(models.Model):
    datetime            = models.DateTimeField(auto_now_add=True, auto_created=True)
    submission_token    = models.CharField(max_length=64)
    solution            = models.TextField(max_length=4096)
    is_accepted         = models.BooleanField()

    user                = models.ForeignKey(User, on_delete=models.CASCADE)
    problem             = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='submissions')
    
    def __str__(self):
        return self.user.username + "'s " + self.problem.title
