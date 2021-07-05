from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import timedelta
from account.models import User
from .validators import validate_text_file


class Event(models.Model):
    slug = models.SlugField(max_length=8, unique=True)
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    rules = models.TextField(max_length=1024)
    is_contest = models.BooleanField(
        default=True, help_text="True if you want Scores and Leaderboard."
    )
    icon = models.ImageField(upload_to="event_icons/")
    datetime = models.DateTimeField(auto_now=False)
    duration = models.DurationField(default=timedelta(hours=2))

    leaderboard = models.ManyToManyField(
        User, through="Leaderboard", related_name="event_of_this_leaderboard"
    )

    def save(self, *args, **kwargs):
        self.slug = self.slug.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Leaderboard(models.Model):
    score = models.IntegerField(default=0)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="leaderboard_of_this_event"
    )

    def __str__(self):
        return self.user.username + " in " + self.event.title

    class Meta:
        ordering = ["-event__datetime", "-score"]


class Problem(models.Model):
    slug = models.SlugField(max_length=8, unique=True)
    title = models.CharField(max_length=32)
    problem_statement = models.TextField(max_length=2048)
    input_statement = models.TextField(max_length=1024)
    output_statement = models.TextField(max_length=1024)
    contraints = models.TextField(max_length=1024, blank=True, null=True)
    example_input = models.TextField(max_length=512, blank=True, null=True)
    example_output = models.TextField(max_length=512, blank=True, null=True)
    example_explanation = models.TextField(max_length=1024, blank=True, null=True)
    points = models.PositiveSmallIntegerField(default=150, help_text="Maximum score.")
    no_of_testcases = models.PositiveSmallIntegerField(default=0)
    penalty = models.PositiveSmallIntegerField(
        default=20, help_text="Points Deduction on Incorrect Attempt."
    )
    point_loss = models.PositiveSmallIntegerField(
        default=2, help_text="Point loss per minute."
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    submission_from = models.ManyToManyField(User, through="Submission")

    def clean(self, *args, **kwargs):
        minutes = self.event.duration.total_seconds() // 60
        if minutes * self.point_loss > self.points * 70 / 100:
            raise ValidationError(
                "Point Loss per minute is too high, points should not get less than 30% of the initial value.\nRefer https://codeforces.com/blog/entry/456"
            )
        super().clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.slug = self.slug.upper()
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Testcase(models.Model):
    def get_input_testcase_path(instance, filename):
        return "testcases/{0}/input.txt".format(instance.problem.title)

    def get_output_testcase_path(instance, filename):
        return "testcases/{0}/output.txt".format(instance.problem.title)

    problem = models.ForeignKey(
        Problem, on_delete=models.CASCADE, related_name="testcases"
    )
    tc_input = models.FileField(
        upload_to=get_input_testcase_path, validators=[validate_text_file]
    )
    tc_output = models.FileField(
        upload_to=get_output_testcase_path, validators=[validate_text_file]
    )

    def __str__(self):
        return self.problem.title + "'s testcase"


class Submission(models.Model):
    datetime = models.DateTimeField(auto_now_add=True, auto_created=True)
    solution = models.TextField(max_length=4096)
    status = models.CharField(max_length=32)
    avg_time = models.FloatField(default=0)
    avg_memory = models.FloatField(default=0)
    testcases_passed = models.SmallIntegerField(default=0)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(
        Problem, on_delete=models.CASCADE, related_name="submissions"
    )

    def __str__(self):
        return self.user.username + "'s " + self.problem.title
