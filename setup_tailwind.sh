#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

tailwind_url="https://github.com/tailwindlabs/tailwindcss/releases/download/v4.1.4/tailwindcss-linux-x64"
tailwind_file="$SCRIPT_DIR/tailwindcss"

curl -L "$tailwind_url" -z "$tailwind_file" -o "$tailwind_file"
chmod +x "$tailwind_file"

"$tailwind_file" --input "$SCRIPT_DIR/config.css" --output "$SCRIPT_DIR/index.css" --minify
