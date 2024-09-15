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
exec docker run --rm -it -p "${PORT}":8080 -v "$(pwd)/target":/app --workdir /app --entrypoint=bash node:22 -c 'npm install && node ./app.js'
