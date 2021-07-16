import os

from django.db.models.signals import post_delete, post_save, pre_save

from .models import Testcase


def update_no_of_testcases(sender, instance, **kwargs):
    problem = instance.problem
    total_testcases = Testcase.objects.filter(problem=problem)
    problem.no_of_testcases = total_testcases.count()
    problem.save()


def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.tc_input:
        if os.path.isfile(instance.tc_input.path):
            os.remove(instance.tc_input.path)
    if instance.tc_output:
        if os.path.isfile(instance.tc_output.path):
            os.remove(instance.tc_output.path)


def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_input_file = sender.objects.get(pk=instance.pk).tc_input
        old_output_file = sender.objects.get(pk=instance.pk).tc_output
    except sender.DoesNotExist:
        return False

    if old_input_file:
        new_file = instance.tc_input
        if not old_input_file == new_file:
            if os.path.isfile(old_input_file.path):
                os.remove(old_input_file.path)
    if old_output_file:
        new_file = instance.tc_output
        if not old_output_file == new_file:
            if os.path.isfile(old_output_file.path):
                os.remove(old_output_file.path)


post_save.connect(update_no_of_testcases, sender=Testcase)
post_delete.connect(update_no_of_testcases, sender=Testcase)
post_delete.connect(auto_delete_file_on_delete, sender=Testcase)
pre_save.connect(auto_delete_file_on_change, sender=Testcase)
