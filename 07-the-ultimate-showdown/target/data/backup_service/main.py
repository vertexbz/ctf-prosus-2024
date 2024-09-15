import os, shutil
import PNGChecker

def main():
    print("Backup service running for pictures")

    for f in os.listdir("/root/"):

        if os.path.isdir("/root/" + f):
            continue

        if not PNGChecker.check("/root/" + f):
            continue

        # Copy file to backup
        shutil.copy("/root/" + f, "/var/backup/" + f)


if __name__ == "__main__":
    main()
