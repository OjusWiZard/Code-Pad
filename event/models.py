from django.core.exceptions import ValidationError
from django.db import models
from django.utils.timezone import timedelta

from account.models import User

from .validators import validate_image_file, validate_text_file


class Event(models.Model):
    slug = models.SlugField(max_length=8, unique=True)
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=1024)
    rules = models.TextField(max_length=1024)
    is_contest = models.BooleanField(
        default=True, help_text="True if you want Scores and Leaderboard."
    )
    icon = models.FileField(upload_to="event_icons/", validators=[validate_image_file])
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
    cpp_solution = models.TextField(max_length=4096, blank=True, null=True)

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    submission_from = models.ManyToManyField(User, through="Submission")

    # def clean(self, *args, **kwargs):
    #     minutes = self.event.duration.total_seconds() // 60
    #     if minutes * self.point_loss > self.points * 70 / 100:
    #         raise ValidationError(
    #             "Point Loss per minute is too high, points should not get less than 30% of the initial value.\nRefer https://codeforces.com/blog/entry/456"
    #         )
    #     super().clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.slug = self.slug.upper()
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Testcase(models.Model):
    def get_input_testcase_path(instance, filename):
        return "testcases/{0}/input.txt".format(instance.problem.id)

    def get_output_testcase_path(instance, filename):
        return "testcases/{0}/output.txt".format(instance.problem.id)

    problem = models.ForeignKey(
        Problem, on_delete=models.CASCADE, related_name="testcases"
    )
    tc_input = models.FileField(
        upload_to=get_input_testcase_path, validators=[validate_text_file]
    )
    tc_output = models.FileField(
        upload_to=get_output_testcase_path, validators=[validate_text_file]
    )
    slowest_time_limit = models.FloatField(
        default=5, help_text="For slowest languages like Python and Python3."
    )
    slower_time_limit = models.FloatField(
        default=3, help_text="For slower languages like Lisp, PHP and Ruby."
    )
    slow_time_limit = models.FloatField(
        default=2,
        help_text="For slow languages like C#, Java, javaScript, Kotlin and Scala",
    )
    std_time_limit = models.FloatField(
        default=1,
        help_text="Standard time limit for all other languages including C/C++",
    )
    tc_input_size = models.FloatField(default=0)
    tc_output_size = models.FloatField(default=0)

    def time_limit(self, lang_id):
        if lang_id in (70, 71):
            return self.slowest_time_limit  # [Python, Python3]
        elif lang_id in (55, 68, 72):
            return self.slower_time_limit  # [Lisp, PHP, Ruby]
        elif lang_id in (51, 62, 63, 78, 81):
            return self.slow_time_limit  # [C#, Java, javaScript, Kotlin, Scala]
        else:
            return self.std_time_limit  # All other Languages

    def get_tc_str(self):
        try:
            tc_inp = self.tc_input.read().decode()
            tc_out = self.tc_output.read().decode()
        except:
            try:
                tc_inp = self.tc_input.read()
                tc_out = self.tc_output.read()
            except Exception:
                print("ERROR Reading Input/Output Files!")
                return
        return (tc_inp, tc_out)

    def save(self, *args, **kwargs):
        tc_inp, tc_out = self.get_tc_str()

        self.tc_input_size = len(tc_inp) / 1024  # in KB
        self.tc_output_size = len(tc_out) / 1024  # in KB

        super().save(*args, **kwargs)

    def __str__(self):
        return self.problem.title + "'s testcase"


class Submission(models.Model):
    datetime = models.DateTimeField(auto_now_add=True, auto_created=True)
    solution = models.TextField(max_length=4096)
    language_id = models.PositiveSmallIntegerField()
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
