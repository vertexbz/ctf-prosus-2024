# Options
Q = $(if $(filter 1,$V),,@)

TARGET_PORT = 1337

TARGET_DOCKER_OPTIONS :=  -p $(TARGET_PORT):1337 --platform=linux/x86_64 --rm `cat .docker_target_image_hash`

# Predefined
THIS_MAKEFILE := $(lastword $(MAKEFILE_LIST))
THIS_DIR := $(abspath $(dir $(THIS_MAKEFILE)))

GREEN  := $(shell tput -Txterm setaf 2 2>/dev/null)
CYAN   := $(shell tput -Txterm setaf 6 2>/dev/null)
YELLOW := $(shell tput -Txterm setaf 3 2>/dev/null)
BOLD   := $(shell tput -Txterm bold 2>/dev/null)
RESET  := $(shell printf "\\033[00m")

# This Makefile assumes that make is being invoked from the Makefile's location.
ifneq ($(shell pwd),$(THIS_DIR))
$(error This project requires make to be invoked inside '$(THIS_DIR)')
endif

# Rules
.DEFAULT_GOAL := help

## Docker:
.docker_target_image_hash: Dockerfile
	@echo "Building ${YELLOW}target${RESET} from ${CYAN}$^${RESET}..."
	$Q docker build --platform=linux/x86_64 --iidfile $@ .
	@echo "${BOLD}${GREEN}OK!${RESET}"

.PHONY: target
target: .docker_target_image_hash ## Builds target docker image

.PHONY: run
run: .docker_target_image_hash level7_BRAIN ## Starts target server instance
	@echo "Starting ${YELLOW}target${RESET} from ${CYAN}`cat $<`${RESET}..."
	@echo "Use ${BOLD}CTRL+C${RESET} to stop"
	$Q docker run -it $(TARGET_DOCKER_OPTIONS)

.PHONY: exec
exec: .docker_target_image_hash level7_BRAIN ## Runs target docker image with interactive shell
	@echo "Entering ${YELLOW}target${RESET} from ${CYAN}`cat $<`${RESET}..."
	$Q docker run -it $(TARGET_DOCKER_OPTIONS) bash


## Cleanup:
.PHONY: clean
clean: ## Removes compiled files
	@echo "Cleaning up compiled files... "
	$Q rm -fv level7_BRAIN | sed 's/^/  /'
	@echo "${BOLD}${GREEN}OK!${RESET}"

.PHONY: distclean
distclean: ## Removes all generated files
	@echo "Cleaning up all generated files... "
	$Q rm -fv level7_BRAIN .docker_target_image_hash | sed 's/^/  /'
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
