FROM --platform=linux/x86_64 debian:latest

RUN apt update && \
    apt install -y socat && \
    mkdir -p /challenge

WORKDIR /challenge
USER nobody
EXPOSE 1337

CMD ["socat", "TCP4-LISTEN:1337,nodelay,fork", "EXEC:/challenge/shutdown_procedure,pty"]
