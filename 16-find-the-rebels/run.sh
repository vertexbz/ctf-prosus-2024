#!/bin/bash
set -e
set -u
set -o pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$(pwd)" != "$SCRIPT_DIR" ]; then
  echo "Error: This script must be run from its own directory."
  exit 1
fi

IMG_ID="target/.docker_target_image_hash"

if [ ! -f ${IMG_ID} ]; then
  docker build -f target/Dockerfile --iidfile ${IMG_ID} ./target/
fi

PORT=${1:-8080}
exec docker run --rm -it -p "${PORT}":8080 -v "$(pwd)/target/app.js":/app/app.js `cat ${IMG_ID}` node ./app.js
