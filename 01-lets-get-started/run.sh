#!/bin/bash
set -e
set -u
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$(pwd)" != "$SCRIPT_DIR" ]; then
  echo "Error: This script must be run from its own directory."
  exit 1
fi

PORT=${1:-8080}
exec docker run --rm -it -p "${PORT}":9090 -v `pwd`/data:/data --workdir /data php:8.2-cli php -S 0.0.0.0:9090 index.php
