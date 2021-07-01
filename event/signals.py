from django.db.models.signals import post_save, post_delete
from .models import Testcase


def update_no_of_testcases(sender, instance, **kwargs):
    problem = instance.problem
    total_testcases = Testcase.objects.filter(problem=problem)
    problem.no_of_testcases = total_testcases.count()
    problem.save()


post_save.connect(update_no_of_testcases, sender=Testcase)
post_delete.connect(update_no_of_testcases, sender=Testcase)
