# Shellcode Injection Exploit

a.k.a. shooting an apple... on somebody's head... riding a horse... blindfolded... with a bow... you made that bow yourself... you learned how to make bows 5 minutes ago...

- https://www.corelan.be/index.php/2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/
- https://stackoverflow.com/a/24438505
- https://shell-storm.org/shellcode/index.html
- https://rayoflightz.github.io/shellcoding/linux/x86/2018/11/15/Shellcoding-for-linux-on-x86.html
- https://www.wireshark.org/download.html

## Requirements
- docker
- python3
- make
- xxd


## Run the target instance
```shell
make run
```


## Connect, inspect, correct
```shell
make connect
```

Check if the target is up and note its memory address. 


## Hack it
```shell
make hack
```

If necessary adjust memory address with `TARGET_ADDR` variable
```shell
make TARGET_ADDR=0x12328 hack
```

Add `stderr` to second "address" of socat to pass stderr pipe along with stdout in `target/Dockerfile`
```dockerfile
# ...
CMD ["socat", "TCP4-LISTEN:1337,reuseaddr,fork", "EXEC:/challenge/shutdown_procedure,pty,raw,stderr"]
```


## Explore it!
- [shutdown_procedure.cpp](target/shutdown_procedure.cpp)
- [exploit.py](exploit.py)
- [shellcode.asm](shellcode.asm)


- [Makefile](Makefile)
- [target/Makefile](target/Makefile)
