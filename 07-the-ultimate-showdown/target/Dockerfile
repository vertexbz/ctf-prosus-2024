FROM ubuntu:latest
ENV DEBIAN_FRONTEND noninteractive
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# System setup
RUN apt update && apt install -y sudo openssh-server python3 vim perl
COPY --chown=root:root --chmod=644 ./data/sshd_config /etc/ssh/sshd_config
RUN mkdir /var/run/sshd && \
    RUNLEVEL=1 dpkg-reconfigure openssh-server && \
    ssh-keygen -A -v && \
    update-rc.d ssh defaults && \
    deluser --remove-all-files ubuntu
EXPOSE 22

# Challenge setup
RUN useradd -ms /bin/bash service_acc && chmod 555 /home/service_acc && echo "service_acc:TemporaryAccess" | chpasswd
RUN useradd -ms /bin/bash developer && chmod 555 /home/developer
RUN useradd -ms /bin/bash manager && chmod 555 /home/manager
RUN useradd -ms /bin/bash admin && chmod 555 /home/admin && echo "admin:AllHailOurTamagotchiOverlord" | chpasswd

RUN groupadd itAdmins && usermod -a -G itAdmins admin && usermod -a -G itAdmins manager # itAdmins:x:1004:admin,manager
RUN groupadd superUsers && usermod -a -G superUsers admin && usermod -a -G superUsers root # superUsers:x:1005:admin,root

RUN chmod 1333 /tmp # create nice data exchange place
RUN chown developer:developer /usr/bin/more && chmod u+s /usr/bin/more  # allows reading developer private key

# allow developer to login with their own ssh key
COPY --chown=developer:developer --chmod=644 data/id_rsa.pub /home/developer/.ssh/id_rsa.pub
COPY --chown=developer:developer --chmod=644 data/id_rsa.pub /home/developer/.ssh/authorized_keys
COPY --chown=developer:developer --chmod=600 data/id_rsa /home/developer/.ssh/id_rsa

COPY --chown=admin:admin --chmod=644 ./data/project.zip /opt/development_server/project.zip

# allow escalation to manager
COPY --chown=root:root --chmod=664 ./data/sudoers /etc/sudoers
COPY --chown=manager:root --chmod=400 ./data/performance.log /var/yearly_meeting/performance.log

# admin password file
COPY --chown=root:itAdmins --chmod=240 ./data/creds.zip /home/admin/.creds

# backup service
COPY --chown=root:root --chmod=755 ./data/backup_service/main.py /opt/backup_service/main.py
COPY --chown=root:superUsers --chmod=770 ./data/backup_service/PNGChecker.py /opt/backup_service/PNGChecker.py

# cleanup script
COPY --chown=root:root --chmod=775 ./data/reset_service.sh /root/reset_service.sh

# cron
COPY --chown=root:root --chmod=644 ./data/crontab /etc/cron.d/crontab

# ssh banner
COPY --chown=root:root --chmod=664 ./data/mybanner /etc/ssh/mybanner

# red herrings
RUN mkdir -p /var/backups/ /usr/games/ && \
    echo "I keep forgetting everything! I probably should write my password down somewhere, but what was it again?" > /home/admin/saved_creds.txt && \
    echo "I don't think the password is here!" > /usr/games/pass.txt && \
    echo "Nope password is not here!" > /var/backups/.password.txt && \
    echo "Backup service running for pictures" > /var/log/backup_service.log

# flags
RUN echo "secretflag:1004:1004:/TAMA{StopPeepin}" >> /etc/passwd && \
    echo "TAMA{Sayonara}" >> /root/flag.txt
