# Shellcode Injection Exploit

- https://www.corelan.be/index.php/2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/
- [Ghidra](https://ghidra-sre.org) (https://formulae.brew.sh/cask/ghidra)
- https://www.sourceware.org/gdb/

## Requirements
- docker
- make


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

Add `stderr` to second "address" of socat to pass stderr pipe along with stdout in `target/Dockerfile`
```dockerfile
# ...
CMD ["socat", "TCP4-LISTEN:1337,reuseaddr,fork", "EXEC:/challenge/shutdown_procedure,pty,raw,stderr"]
```


## Explore it!
- [level7_BRAIN](target/level7_BRAIN)
- [exploit.py](exploit.py)


- [Makefile](Makefile)
- [target/Makefile](target/Makefile)
