celery: celery worker  --app CodePad --broker $RABBITMQ_URL --queue submissions,get-verdict --detach
flower: celery flower --broker $RABBITMQ_URL
web: gunicorn CodePad.wsgi --log-file -