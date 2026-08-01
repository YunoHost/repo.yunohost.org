#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$SCRIPT_DIR"

tailwind_url="https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-linux-x64"
tailwind_file="$SCRIPT_DIR/build/tailwindcss"

fontawesome_url=https://use.fontawesome.com/releases/v5.15.4/fontawesome-free-5.15.4-web.zip
fontawesome_file="$SCRIPT_DIR/build/fontawesome-web.zip"

dl() {
    url="$1"
    file="$2"
    if [ -f "$file" ]; then
        curl -L "$url" -z "$file" -o "$file"
    else
        curl -L "$url" -o "$file"
    fi
}

download() {
    mkdir -p "$SCRIPT_DIR/build"

    dl "$tailwind_url" "$tailwind_file"
    chmod +x "$tailwind_file"

    dl "$fontawesome_url" "$fontawesome_file"
    unzip "$fontawesome_file" -d "$SCRIPT_DIR/build"
    rm -rf "$SCRIPT_DIR/fontawesome"
    mv "$SCRIPT_DIR/build/fontawesome"-*/ "$SCRIPT_DIR/fontawesome"


    dl https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js "jquery.min.js"
    dl https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js "showdown.min.js"
}

build() {
    "$tailwind_file" --input "$SCRIPT_DIR/config.css" --output "$SCRIPT_DIR/index.css" --minify
}

case "$1" in
    download) download ;;
    build) build;;
esac
