from os import environ
from time import sleep
from traceback import format_exc

from celery import shared_task
from django.utils.timezone import datetime
from judge0api import Client
from pytz import UTC

from account.models import User

from .judge import SingleSubmission
from .models import Leaderboard, Problem, Submission


@shared_task
def submit(
    problem_id: int,
    user_id: int,
    submission_id: int,
    solution: str,
    lang_id: int,
    submitting_time: str,
):
    submission = Submission.objects.get(id=submission_id)
    if solution == "" or lang_id == 0:
        submission.status = "Wrong Answer"
        print("Submission " + str(submission.id) + ": Empty Submission")
        submission.save()
        return

    verdict = "Accepted"
    tc_passed = 0
    tc_skipped = 0
    avg_time = 0
    avg_memory = 0

    try:
        client = Client(environ["JUDGE_HOST"], environ["X_Auth_Token"])
    except Exception:
        print("ERROR Connecting the Judge!")
        print(format_exc())
        return

    print("Submission " + str(submission.id) + ": Evaluation Started")
    problem = Problem.objects.get(id=problem_id)
    testcases = problem.testcases.all()
    submission.status = "Processing"
    submission.save()

    for testcase in testcases:
        try:
            tc_inp, tc_out = testcase.get_tc_str()
            tc_inp_size = len(tc_inp) / 1024
            tc_out_size = len(tc_out) / 1024
            size_limit = float(environ.get("FILE_SIZE_LIMIT_KB"))

            if tc_inp_size + tc_out_size > size_limit:
                print(
                    "SkippingTestcase "
                    + str(testcase.id)
                    + ": File Size Limit Exceeded"
                )
                tc_skipped += 1
                continue

            single_submission = SingleSubmission(
                source_code=solution,
                language_id=lang_id,
                stdin=tc_inp,
                expected_output=tc_out,
                cpu_time_limit=testcase.time_limit(lang_id),
            )
            result = single_submission.submit(client)
        except:
            print(format_exc())
            submission.status = "Evaluation Error"
            submission.save()
            return

        wait_sec = 0.0625
        while wait_sec < 64:
            sleep(wait_sec)
            result.load(client)
            if result.status["id"] > 2:
                break
            wait_sec *= 2

        if result.status["id"] != 3:
            verdict = result.status["description"]
            print(
                "Submission "
                + str(submission.id)
                + ": Testcase id "
                + str(testcase.id)
                + " Failed"
            )
            break

        print(
            "Submission "
            + str(submission.id)
            + ": Testcase id "
            + str(testcase.id)
            + " Passed"
        )
        avg_time += float(result.time)
        avg_memory += float(result.memory)
        tc_passed += 1

    if tc_skipped == len(testcases):
        print("All Testcases skipped!")
        submission.status = "Evaluation Error"
        submission.save()
        return

    if tc_passed > 0:
        avg_time /= tc_passed
        avg_memory /= tc_passed

    event = problem.event
    submitting_time = datetime.strptime(submitting_time, "%Y-%m-%dT%H:%M:%S.%fZ")
    submitting_time = UTC.localize(submitting_time)
    if (
        event.datetime <= submitting_time <= (event.datetime + event.duration)
        and event.is_contest
    ):
        user = User.objects.get(id=user_id)
        submissions = Submission.objects.filter(user=user, problem=problem)
        submissions = submissions.exclude(status="In Queue")
        submissions = submissions.exclude(status="Processing")
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
    print("Submission " + str(submission.id) + ": " + verdict)


@shared_task
def set_tc_time_limits(problem_id: int):
    problem = Problem.objects.get(id=problem_id)
    solution = problem.cpp_solution
    testcases = problem.testcases.all()

    try:
        client = Client(environ["JUDGE_HOST"], environ["X_Auth_Token"])
    except Exception:
        print("ERROR Connecting the Judge!")
        return

    for testcase in testcases:
        try:
            tc_inp, tc_out = testcase.get_tc_str()
            tc_inp_size = len(tc_inp) / 1024
            tc_out_size = len(tc_out) / 1024
            size_limit = float(environ.get("FILE_SIZE_LIMIT_KB"))

            if tc_inp_size + tc_out_size > size_limit:
                print(
                    "SkippingTestcase "
                    + str(testcase.id)
                    + ": File Size Limit Exceeded"
                )
                continue

            single_submission = SingleSubmission(
                source_code=solution,
                language_id=54,
                stdin=tc_inp,
                expected_output=tc_out,
                cpu_time_limit=2,
            )
            result = single_submission.submit(client)
        except Exception as err:
            print(format_exc())
            return

        wait_sec = 0.0625
        while wait_sec < 64:
            sleep(wait_sec)
            result.load(client)
            if result.status["id"] > 2:
                break
            wait_sec *= 2

        if result.status["id"] == 3:
            time_limit = float(result.time) + 0.2
            testcase.std_time_limit = time_limit
            testcase.slow_time_limit = time_limit * 2
            testcase.slower_time_limit = time_limit * 3
            testcase.slowest_time_limit = time_limit * 5
            testcase.save()
            print(
                "Testcase: "
                + str(testcase.id)
                + " std_time_limit set to "
                + str(time_limit)
            )
        else:
            print("Wrong code in problem.cpp_solution")
            return
