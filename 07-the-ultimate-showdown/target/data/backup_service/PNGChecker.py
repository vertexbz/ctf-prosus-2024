# Project:             PNG checker
# Author:              r00t
# Creation date:       12-4-2024

# Checks if files is explicit png format.
def check(filename):
    with open(filename, 'rb') as f:
        buffer = f.read()
        if '.png' in filename or 'pneg' in filename:
            if buffer[0] == 'P' and buffer[1] == 'N' and buffer[2] == 'G':
                return True
    return False

