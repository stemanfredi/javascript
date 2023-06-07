#!/bin/bash

# create a temporary file
tempFile=$(mktemp)

# start the scripts object
echo -n "const scripts = {" > $tempFile

# enable handling of filenames with spaces
IFS=$'\n'

for dir in $(find scripts -mindepth 1 -maxdepth 1 -type d); do
    dir_name=$(basename "$dir")
    echo -n "  '$dir_name': [" >> $tempFile
    
    for file in $(find "$dir" -type f -name '*.js'); do
        file_name=$(basename "$file")
        echo -n "    '$file_name'," >> $tempFile
    done

    echo -n "  ]," >> $tempFile
done

# restore IFS
IFS=$' \t\n'

# end the scripts object
echo "}" >> $tempFile

# read the contents of tempFile into a variable
new_scripts_line=$(<"$tempFile")

# replace the scripts object in app.js
perl -i -0777 -pe "s/const scripts = \{.*?\}/$new_scripts_line/gs" app.js

# remove temporary file
rm $tempFile