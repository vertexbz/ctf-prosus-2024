# Shell exploration

- Any (sticky) directory without read is good place to pass things around if env is shared (FFS!)

- Searching for suid files
  ```shell
  find / -perm -u=s -type f 2>/dev/null
  ```
  https://gtfobins.github.io

- Searching for last modified files
  ```shell
  find / \( -path /proc -o -path /sys -o -path /usr/share/man -o -path /var/lib/systemd -o -path /usr/share/zoneinfo -o -path /usr/share/perl\* -o -path /usr/share/python\* -o -path /usr/share/bash-completion -o -path /usr/share/lintian -o -path /usr/share/X11 -o -path /usr/share/doc -o -path /usr/share/vim -o -path /usr/share/locale -o -path /usr/share/ca-certificates/mozilla -o -path /usr/share/terminfo -o -path /usr/share/zsh -o -path /usr/share/nano -o -path /var/lib/apt -o -path /usr/lib -o -path /var/lib/dpkg -o -path /usr/lib \) -prune -o -type f \
  -printf '%T@ :%TY-%Tm-%Td %TH:%TM:%TS \033[0;33m%M[%m]\t\033[1;34m%u[%U]:\033[1;36m%g[%G]\033[0m %p \033[1;31m%Z\033[0m\n' 2>/dev/null | sort -nr | cut -d: -f2- | head -n 500
  ```
  Sort by
  - %B@ - creation time
  - %T@ - last modification time
  - %A@ - last access time
  - %C@ - last status change time

## Interesting stuff found after CTF
- https://book.hacktricks.xyz/linux-hardening/useful-linux-commands
- https://book.hacktricks.xyz/linux-hardening/privilege-escalation
- https://book.hacktricks.xyz/linux-hardening/bypass-bash-restrictions
- https://delinea.com/blog/linux-privilege-escalation
