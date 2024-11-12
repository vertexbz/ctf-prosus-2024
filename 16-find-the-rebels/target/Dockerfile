FROM node:22

RUN apt-get update &&  \
    apt-get install -y iputils-ping

COPY static /app/static
COPY package.json /app/package.json
COPY app.js /app/app.js
COPY flag.txt /flag.txt
WORKDIR /app

RUN npm install
