FROM debian:testing

RUN apt update && \
    apt install -y socat libc6-i386 lib32stdc++6 && \
    mkdir -p /challenge

COPY --chown=root:root --chmod=755  level7_BRAIN /challenge/level7_BRAIN
COPY --chown=root:root --chmod=644  flag.txt /challenge/flag.txt

WORKDIR /challenge
USER nobody
EXPOSE 1337

CMD ["socat", "TCP4-LISTEN:1337,reuseaddr,fork", "EXEC:/challenge/level7_BRAIN,pty,raw"]
