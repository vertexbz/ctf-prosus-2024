# Shellcode Injection

a.k.a. shooting an apple... on somebody's head... riding a horse... blindfolded... with a bow... you made that bow yourself... you learned how to make bows 5 minutes ago...

- https://www.corelan.be/index.php/2009/07/19/exploit-writing-tutorial-part-1-stack-based-overflows/
- https://stackoverflow.com/a/24438505
- https://shell-storm.org/shellcode/index.html
- https://rayoflightz.github.io/shellcoding/linux/x86/2018/11/15/Shellcoding-for-linux-on-x86.html

## Requirements
- docker
- python3
- make
- xxd

## Run the target instance
```shell
cd target
make run
```

## Hack it
```shell
make hack
```

## Explore it!
- [shutdown_procedure.cpp](target/shutdown_procedure.cpp)
- [injector.py](injector.py)
- [shellcode.asm](shellcode.asm)


- [Makefile](Makefile)
- [target/Makefile](target/Makefile)
