celery: celery worker  --app CodePad --broker $RABBITMQ_URL --loglevel info --queue submissions
web: gunicorn CodePad.wsgi -w 3 --log-file -
flower: celery flower --broker $RABBITMQ_URL