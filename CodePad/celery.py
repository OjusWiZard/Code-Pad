import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CodePad.settings")

envvars = os.environ.keys()
if "RABBITMQ_URL" in envvars:
    broker_url = os.environ["RABBITMQ_URL"]
else:
    broker_url = "amqp://guest:guest@rabbit:5672"

app = Celery("CodePad", broker=broker_url)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
