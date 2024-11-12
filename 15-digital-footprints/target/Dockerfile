FROM php:latest

RUN mkdir -p /app && \
    apt-get update && \
    apt-get install -y proftpd procps cron

WORKDIR /app

VOLUME /app
