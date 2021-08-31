<p align="center">
    <a href="http://codepad.tech/">
    <img alt="CodePad" height="125" src="./client/public/CodePad.svg">
  </a>
</p>

<p align="center">
The Competitive Programming Platform of JSSATEN.<br/>See you on the Leaderboard!
</p>
<p align="center">
<a href="http://codepad.tech/">View Demo</a>
·
<a href="https://github.com/SingingApple/Code-Pad/issues">Raise Issue</a>
·
<a href="mailto:support@codepad.tech">Support</a>
</p>


<details open="open">
  <summary><b>Table of Contents</b></summary>
  <ul>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#quick-start">Quick Start</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#backend">Backend</a></li>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#docker-way-to-quick-start-the-complete-project">Docker-way to quick start the complete project</a></li>
      </ul>
    </li>
    <li><a href="#contributers">Contributers</a></li>
    <li><a href="#license">License</a></li>
  </ul>
</details>

<a id=about-the-project></a>

# 🔎 About the Project
[CodePad](https://codepad.tech) is an online quiz platform that empowers programmers to solve coding problems in real-time with an [Online Code Editor](https://codepad.tech/editor) and compilers for all popular languages.

It is created as a platform to help programmers make it big in the world of Algorithms, Computer Crogramming, and [Programming Contests](https://codepad.tech/events).

At CodePad, we work hard to revive the geek in you by hosting programming contests. We also put in a lot of efforts in getting quality problems, which would, in turn, foster your learning while solving them.

### Built With [React](https://reactjs.org/) and [Django](https://www.djangoproject.com/).

<a id=features></a>

# 🎯 Features
* Interesting UI/UX to not get bored easily
* Host multiple Contests
  * Custom time duration of Contest
  * Multiple Problems per Contest
    * Multiple testcases per Problems
    * Custom Score of easy Problem
    * Custom Penalty on wrong solution submission
    * Score deduction with time gradient
  * Live Leaderboard
* Integrated Code Editor to code side-by-side
  * Upload your code file directly to the editor
  * Syntax Highlighting and Auto-Completion
  * Statistics of the code execution
    * Time in seconds and Memory in KiloBytes
    * stdout and stderr
  * Custom input to pass as stdin
* 45+ Programming Languages supported
* Optimized evaluation to prevent bottlenecks
  * Asynchronous Evaluation of submissions
  * Load balanced workers to execute and evaluate code 

<a id=quick-start></a>

# ⚡️ Quick Start

<a id=prerequisites></a>

## Prerequisites
The following things must be ready for function of the project:
* [yarn](https://yarnpkg.com/)
* [RabbitMQ](https://www.rabbitmq.com/)
* [Celery](https://docs.celeryproject.org/)
* [PostgreSQL](https://www.postgresql.org/) (Optional)
* [Cloudinary](https://cloudinary.com/) (Optional)

The first thing to do is to clone the repository:
```bash
git clone https://github.com/SingingApple/Code-Pad.git
cd Code-Pad
```

<details>
    <summary><b><a id=backend></a>⚙️ Backend</b></summary>

In the current directory:

1. create a `.env` file to store environment variables
```bash
touch .env
```

2. Set the following environment variables in the `.env` file

<details>
    <summary>.env</summary>

```properties
# General Settings

SERVER_HOST="*"
DJANGO_SECRET_KEY=""
DEBUG=True
FRONTEND_HOST="localhost:3000"


# Static Settings

# If you are using Cloudinary as a CDN, set these three variables. Else leave them commented
# MEDIA_CLOUD_NAME=
# MEDIA_API_KEY=
# MEDIA_API_SECRET=

# If Cloudinary env vars are not provided then these two are used automatically
MEDIA_ROOT="media/"
STATIC_ROOT="static/"


# Email Settings

# Emailing stuff will not work without these environment variables. Rest will work, if you leave them empty.
EMAIL_USE_TLS= # True/False
EMAIL_HOST=""
EMAIL_PORT=587
EMAIL_HOST_USER=""
EMAIL_HOST_PASSWORD=""

# Set the same as EMAIL_HOST_USER
DEFAULT_FROM_EMAIL=""


# Postgres Settings

# Set these five variables if you want to use PostgreSQL.
# Otherwise leave them commented to use SQLite by default.
# POSTGRES_DB=""
# POSTGRES_USER=""
# POSTGRES_PASSWORD=""
# POSTGRES_HOST=""
# POSTGRES_PORT=""


# Judge Settings

JUDGE_HOST="http://judge0IsHostedHere/"
X_Auth_Token=""
FILE_SIZE_LIMIT_KB="512"


# RabbitMQ Settings

RABBITMQ_DEFAULT_VHOST=""
RABBITMQ_DEFAULT_USER=""
RABBITMQ_DEFAULT_PASS=""
RABBITMQ_DEFAULT_HOST=""

```
</details>

3. Create a virtual environment to install dependencies in and activate it:
```bash
virtualenv venv
source venv/bin/activate
```

4. Then install the dependencies:
```bash
pip install -r requirements.txt
```

5. Migrate using
```bash
python manage.py migrate
```

6. Finally Run the developement server using
```bash
python manage.py runserver
```

### Note -
If you have configured your own Judge0 and RabbitMQ server then you may also need to run a celery worker to process the messages. For that:

1. Export the RabbitMQ broker URL in environment
```bash
export RABBITMQ_BROKER=""
```

2. Run the celery workers using
```bash
celery worker --app CodePad --loglevel info --queue submissions --broker $RABBITMQ_BROKER
```

That's all you need to know for the backend! 🎉
</details>

<details>
    <summary><b><a id=frontend></a>🖼️ Frontend</b></summary>

In the `client` directory:

1. Create a `.env` file to store environment variables
```bash
touch .env
```

2. Set the following environment variables in the `.env` file
<details>
    <summary>.env</summary>

```properties
REACT_APP_BASEURL="http://localhost:8000"
HTTP_PROXY="http://localhost:8000"
REACT_APP_JUDGEHOST="https://judge0IsHostedHere/submissions/?wait=true&base64_encoded=true"
REACT_APP_JUDGELANGUAGE="https://judge0IsHostedHere/languages"
```
</details>

Now you can use:
### `yarn`

Installs all the dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

That's all you need to know for the frontend! 🎉
</details>

<a id=docker-way-to-quick-start-the-complete-project></a>

## 🐳 Docker-way to quick start the complete project

In the root directory:

1. Change the following value in the `.env` file.
<details>
    <summary>.env</summary>

```properties
# Postgres Settings

POSTGRES_DB="codepad"
POSTGRES_USER="hackNCS"
POSTGRES_PASSWORD="CodePadDatabaseHackNCS"
POSTGRES_HOST="postgres"
POSTGRES_PORT="5432"


# RabbitMQ Settings

RABBITMQ_DEFAULT_VHOST="codepad"
RABBITMQ_DEFAULT_USER="hackNCS"
RABBITMQ_DEFAULT_PASS="CodePadRabbitMQHackNCS"
RABBITMQ_DEFAULT_HOST="rabbitmq"
```
</details>

**Note:** Rest of the variables shall be same as defined under Backend category above.

2. Set the variable in the `client/.env` file same as above in the frontend category.

3. Make sure there is no service running on the following ports already.
   * `3000` - for React app
   * `8000` - for Django server
   * `5672` - for RabbitMQ server
   * `15672` - for RabbitMQ admin
   * `5432` - for PostgreSQL server
```bash
lsof -i -P -n | grep 127.0.0.1:<port_number>
```

If there are some services running then terminate them using their respective closing commands.

4. Create a docker network which might come useful to connect the django server to the judge0.
```bash
docker network create codenet
```

5. Finally, in the root directory, **Spin-Up** the project using
```bash
docker-compose up
```

<a id=contributers></a>

# Contributers
<a href="https://github.com/SingingApple/Code-Pad/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SingingApple/Code-Pad" />
</a>

<a id=license></a>

# 📝 License

This project follows the [MIT License](LICENSE).
