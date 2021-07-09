import os

from django.conf import settings
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CodePad.settings")

broker_vhost = settings.RABBITMQ_VHOST
broker_user = settings.RABBITMQ_USER
broker_pass = settings.RABBITMQ_PASS
broker_host = settings.RABBITMQ_HOST
broker_url = (
    "amqp://" + broker_user + ":" + broker_pass + "@" + broker_host + "/" + broker_vhost
)

app = Celery("CodePad", broker=broker_url)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
