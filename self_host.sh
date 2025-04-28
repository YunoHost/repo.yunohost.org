#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$SCRIPT_DIR"

wget https://use.fontawesome.com/releases/v5.15.4/fontawesome-free-5.15.4-web.zip
unzip fontawesome-free-5.15.4-web.zip
rm -rf fontawesome
mv fontawesome-free-5.15.4-web fontawesome

wget https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
wget https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js
