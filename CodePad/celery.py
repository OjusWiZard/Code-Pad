import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CodePad.settings")

broker_vhost = os.environ["RABBITMQ_DEFAULT_VHOST"]
broker_user = os.environ["RABBITMQ_DEFAULT_USER"]
broker_pass = os.environ["RABBITMQ_DEFAULT_PASS"]
broker_host = os.environ["RABBITMQ_DEFAULT_HOST"]
broker_url = (
    "amqp://" + broker_user + ":" + broker_pass + "@" + broker_host + "/" + broker_vhost
)

app = Celery("CodePad", broker=broker_url)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
