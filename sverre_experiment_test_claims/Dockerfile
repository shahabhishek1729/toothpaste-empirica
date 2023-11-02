from ghcr.io/empiricaly/empirica:latest

COPY . /app

WORKDIR /app/server
RUN empirica npm install

WORKDIR /app/client
RUN empirica npm install

EXPOSE 3000

WORKDIR /app
ENTRYPOINT empirica --production
