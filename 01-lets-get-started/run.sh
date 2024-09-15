#!/bin/bash
exec docker run --rm -it -p 9090:9090 -v `pwd`/data:/data --workdir /data php:8.2-cli php -S 0.0.0.0:9090 index.php
