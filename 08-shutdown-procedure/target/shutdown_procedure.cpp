#include <iostream>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/mman.h>
#include <stdint.h>

using namespace std;

//int sizeMemory __attribute__((section(".exec"))) = 0;

int sizeMemory = 0;
char memoryData[500] = {0};

void banner() {

    printf("   ______        __     __                  ___                      __            \n");
    printf("  / __/ /  __ __/ /____/ /__ _    _____    / _ \\_______  _______ ___/ /_ _________ \n");
    printf(" _\\ \\/ _ \\/ // / __/ _  / _ \\ |/|/ / _ \\  / ___/ __/ _ \\/ __/ -_) _  / // / __/ -_)\n");
    printf("/___/_//_/\\_,_/\\__/\\_,_/\\___/__,__/_//_/ /_/  /_/  \\___/\\__/\\__/\\_,_/\\_,_/_/  \\__/ \n\n");

    printf("Created by TamaCoder\n\n");
}

int menu() {

    fflush(stdin);
    printf("\n _________________________________\n");
    printf("| Menu | Description              |\n");
    printf("|------|--------------------------|\n");
    printf("|  0.  | View process memory      |\n");
    printf("|  1.  | Add shutdown sequence    |\n");
    printf("|  2.  | Force initiate shutdown  |\n");
    printf("|______|__________________________|\n\n");
    printf("Choice: ");

    int chosen;
    if (scanf("%d", &chosen) != 1) {
        printf("\nYou didn't give a valid number\n");
        printf("Exiting noww\n\n");
        exit(1);
    }

    if (chosen < 0) {
        printf("\nYou didn't give a valid number\n");
        printf("Exiting noww\n\n");
        exit(1);
    }

    return chosen;
}

void viewMemory() {
    printf("Memory Dump: %p\n", memoryData);

    // Custom hex dump
    for (int i = 0; i < 304; i++) {

        if (i % 8 == 0 && i > 0)
            printf(" ");

        // String dump behind hex dump.
        if (i % 16 == 0 && i > 0) {
            for (int j = i -16; j < i; j++) {
                if (j % 8 == 0) {
                    printf(" ");
                }
                if (memoryData[j] > 32 && memoryData[j] < 126)
                    printf("%c", memoryData[j]);
                else
                    printf(".");
            }
            printf("\n");
            printf("%02x ", memoryData[i] & 0xff);
        } else {
            printf("%02x ", memoryData[i] & 0xff);
        }
    }

    // For the last string dump.
    printf(" ");
    for (int j = 304 -16; j < 304; j++) {
        if (j % 8 == 0) {
            printf(" ");
        }
        if (memoryData[j] > 32 && memoryData[j] < 126)
            printf("%c", memoryData[j]);
        else
            printf(".");
    }
    printf("\n");
}

void addSequence() {

    char scriptLocation[50] = {0};
    char newSequence[500];
    int chosen, bytesWritten;
    char reason[50];
    string name, type, path;

    printf(" __________________________\n");
    printf("| Menu | Type              |\n");
    printf("|------|-------------------|\n");
    printf("|  0.  | Emergency         |\n");
    printf("|  1.  | Normal            |\n");
    printf("|  2.  | Custom command    |\n");
    printf("|  3.  | Restart-to-update |\n");
    printf("|______|___________________|\n\n");
    printf("Choice of sequence: ");

    if (scanf("%d", &chosen) != 1 || chosen < 0) {
        printf("\nYou didn't give a valid number\n");
        exit(0);
    }

    printf("Name of the shutdown sequence? ");
    cin >> name;

    printf("What is the path of the shutdown sequence script? ");
    cin >> path;

    printf("The reason for shutdown (max 50 letters!): \n");
    cin >> reason;

    switch (chosen)
    {
    case 0:
        type = "Emergency";
        break;
    case 1:
        type = "Normal";
        break;
    case 2:
        type = "Custom command";
        break;
    case 3:
        type = "Restart-to-update";
        break;
    default:
        type = "Custom command";
        break;
    }

    bytesWritten = snprintf(newSequence, 500, "Name:%s,Path:%s,Type:%s,reason:%s", name.c_str(), path.c_str(), type.c_str(), reason);

    if ((sizeMemory + bytesWritten )>= 500) {
        printf("Out of memory!\n");
        exit(2);
    }

    strncpy(memoryData+sizeMemory, newSequence, bytesWritten);
    sizeMemory += bytesWritten;

    printf("Added the new shutdown sequence to memory!\n");

    strcpy(scriptLocation, path.c_str());
    printf("Scanning the script at path %s\n", scriptLocation);
}

int main() {
    banner();

    // Some magic for making memory executable.
    long pageSize = sysconf(_SC_PAGESIZE);

    void* alignedAddr = (void*)((long)memoryData & ~(pageSize -1));
    if (mprotect(alignedAddr, pageSize, PROT_READ | PROT_WRITE | PROT_EXEC) == -1) {
        printf("Failed to make page executable for code! Error code: %d\n\n", errno);
        return 0;
    }

    strncpy(memoryData, "Corrupted Memory",16);
    sizeMemory += 16;

    for (;;) {
        switch (menu()) {

            case 0: {
                viewMemory();
                break;
            }

            case 1: {
                addSequence();
                break;
            }

            case 2: {
                printf("Sorry, only root can force the initial shutdown!\n");
                printf("You will have to find another way.\n");
                break;
            }

            default: {
                printf("Unknown option, quitting!\n");
                return 1;
            }
        }
    }


    return 0;

}
