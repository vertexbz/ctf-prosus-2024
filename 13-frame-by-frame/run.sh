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
exec docker run --rm -it -p "${PORT}":8080 -v "$(pwd)/data":/data -v "$(pwd)/db/tama.sqlite":/tama.sqlite:ro -v "$(pwd)/db/users.sqlite":/users.sqlite:ro --workdir /data php:8.3.10-cli php -S 0.0.0.0:8080
