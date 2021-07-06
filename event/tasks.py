from os import environ

from celery import shared_task
from django.utils.timezone import datetime
from judge0api import Client
from pytz import UTC

from account.models import User

from .judge import SingleSubmission
from .models import Leaderboard, Problem, Submission, Testcase


def time_limit(lang_id):
    if lang_id in (70, 71):
        return 10  # [Python, Python3]
    elif lang_id in (55, 68, 72):
        return 6  # [Lisp, PHP, Ruby]
    elif lang_id in (51, 62, 63, 78, 81):
        return 4  # [C#, Java, javaScript, Kotlin, Scala]
    else:
        return 2  # All other Languages


@shared_task
def submit(
    problem_id: int,
    user_id: int,
    submission_id: int,
    solution: str,
    lang_id: int,
    submitting_time: str,
):
    problem = Problem.objects.get(id=problem_id)
    user = User.objects.get(id=user_id)
    submission = Submission.objects.get(id=submission_id)
    event = problem.event
    testcases = Testcase.objects.filter(problem=problem)
    client = Client(environ["JUDGE_HOST"], environ["X_Auth_Token"])
    submitting_time = datetime.strptime(submitting_time, "%Y-%m-%dT%H:%M:%S.%fZ")
    submitting_time = UTC.localize(submitting_time)

    submission.status = "Processing"
    submission.save()

    verdict = "Accepted"
    tc_passed = 0
    avg_time = 0
    avg_memory = 0
    for testcase in testcases:
        tc_inp_file = testcase.tc_input.open(mode="r")
        tc_out_file = testcase.tc_output.open(mode="r")
        tc_out = str(tc_out_file.read().decode())
        tc_inp = str(tc_inp_file.read().decode())
        tc_inp_file.close()
        tc_out_file.close()
        single_submission = SingleSubmission(
            source_code=solution,
            language_id=lang_id,
            stdin=tc_inp,
            expected_output=tc_out,
            cpu_time_limit=time_limit(lang_id),
        )
        result = single_submission.submit(client)
        if result.status["id"] != 3:
            verdict = result.status["description"]
            break
        avg_time += float(result.time)
        avg_memory += float(result.memory)
        tc_passed += 1

    avg_time /= tc_passed
    avg_memory /= tc_passed

    if (
        event.datetime <= submitting_time <= (event.datetime + event.duration)
        and event.is_contest
    ):
        submissions = Submission.objects.filter(user=user, problem=problem)
        correct_submissions = submissions.filter(status="Accepted")
        if not correct_submissions and verdict == "Accepted":
            incorrect_submissions = submissions.difference(correct_submissions)
            current_leaderboard_field = Leaderboard.objects.get_or_create(
                user=user, event=event
            )[0]
            current_leaderboard_field.score += problem.points
            current_leaderboard_field.score -= (
                problem.penalty * incorrect_submissions.count()
            )
            current_leaderboard_field.score -= problem.point_loss * (
                submitting_time.minute - event.datetime.minute
            )
            current_leaderboard_field.save()

    submission.avg_time = avg_time
    submission.avg_memory = avg_memory
    submission.testcases_passed = tc_passed
    submission.status = verdict
    submission.save()
