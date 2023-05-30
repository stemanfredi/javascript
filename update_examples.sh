#!/bin/bash

# list .js files in './examples' directory
js_files=$(ls ./examples/*.js | sed -e "s/\.\/examples\///g" -e "s/^/'/g" -e "s/$/'/g" | awk '{printf "%s, ", $0}' | sed 's/, $//')

# create the new scripts line
new_scripts_line="const scripts = [$js_files]"

# replace the scripts line in main.js
perl -i -0777 -s -pe 's/const scripts = \[[\s\S]*?\]/$replacement/g' -- -replacement="$new_scripts_line" main.js
