FROM --platform=linux/x86_64 debian:latest

RUN apt update && \
    apt install -y socat libc6-i386 lib32stdc++6 && \
    mkdir -p /challenge && \
    echo "The flag was taken by Chrząszczyżewoszyce-Powiat-Łękołody on 2024-09-13 00:27:29 ;)" > /challenge/flag.txt

WORKDIR /challenge
USER nobody
EXPOSE 1337

CMD ["socat", "TCP4-LISTEN:1337,reuseaddr,fork", "EXEC:/challenge/shutdown_procedure,pty,raw"]
