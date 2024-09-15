#!/bin/bash
set -e
set -u
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$(pwd)" != "$SCRIPT_DIR" ]; then
  echo "Error: This script must be run from its own directory."
  exit 1
fi

if [ ! -r ./target/data/id_rsa ] || [ ! -r ./target/data/id_rsa.pub ]; then
  rm -rf ./target/data/id_rsa ./target/data/id_rsa.pub
  ssh-keygen -t rsa -q -f ./target/data/id_rsa -N ""
fi

PORT=${1:-2222}
docker build --iidfile .image_hash -f ./target/Dockerfile ./target
exec docker run --rm -it -p "${PORT}":22 "$(cat .image_hash)" /bin/sh -c '/usr/sbin/sshd -f /etc/ssh/sshd_config -D'
