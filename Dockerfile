FROM python:3.9.5-slim

ENV PYTHONUNBUFFERED=1

RUN apt -y update && apt -y install apt-utils && apt -y upgrade

RUN apt -y install python3 python3-pip

WORKDIR /codepad

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .