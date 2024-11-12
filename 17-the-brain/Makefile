# Options
Q = $(if $(filter 1,$V),,@)
CAPTION = $(if $(filter 1,$V),echo,printf)

LIVE_HOST = thebrain.tamagodzilla.lol
TARGET_HOST = localhost
TARGET_PORT = 1337

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


## Run:
.PHONY: run
run: ## Runs target instance
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
hack: exploit.py ## Injects, executes shellcode on the target, opens shell access
	@echo "Hacking into ${YELLOW}$(TARGET_HOST):$(TARGET_PORT)${RESET} with ${CYAN}$<${RESET} @ ${CYAN}$(TARGET_ADDR)${RESET} payload..."
	$Q cat <(python3 exploit.py $< $(TARGET_ADDR)) | nc $(TARGET_HOST) $(TARGET_PORT) || echo "${RED}Connection terminated${RESET}"

.PHONY: hack-live
hack-live: exploit.py ## Injects, executes shellcode on the target, opens shell access (live challenge)
	@$(MAKE) TARGET_HOST=$(LIVE_HOST) TARGET_ADDR=$(LIVE_ADDR) hack

## Cleanup:
.PHONY: distclean
distclean: ## Removes all generated files
	@echo "Cleaning up all generated files... "
	$Q rm -fv .docker_toolchain_image_hash | sed 's/^/  /'
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
