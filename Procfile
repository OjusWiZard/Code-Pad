celery: celery worker  --app CodePad --broker $RABBITMQ_URL --loglevel info --queue submissions,get-verdict
flower: celery flower --broker $RABBITMQ_URL
web: gunicorn CodePad.wsgi --log-file -