#!/bin/bash

current_version=$(cat VERSION)
IFS='.' read -r major minor patch <<< "$current_version"

case "$1" in
    major)
        major=$((major + 1))
        minor=0
        patch=0
        ;;
    minor)
        minor=$((minor + 1))
        patch=0
        ;;
    *)
        # Default: bump patch
        patch=$((patch + 1))
        ;;
esac

new_version="$major.$minor.$patch"
echo "$new_version" > VERSION

deno bundle deno/lv03ToWgs.js > release/lv03ToWgs.deno.js
deno bundle deno/lv95ToWgs.js > release/lv95ToWgs.deno.js
deno bundle deno/wgsToLv03.js > release/wgsToLv03.deno.js
deno bundle deno/wgsToLv95.js > release/wgsToLv95.deno.js

deno bundle node/lv03ToWgs.js > release/lv03ToWgs.node.js
deno bundle node/lv95ToWgs.js > release/lv95ToWgs.node.js
deno bundle node/wgsToLv03.js > release/wgsToLv03.node.js
deno bundle node/wgsToLv95.js > release/wgsToLv95.node.js

sed -i "2i // ndj v$new_version" release/lv03ToWgs.deno.js
sed -i "2i // ndj v$new_version" release/lv95ToWgs.deno.js
sed -i "2i // ndj v$new_version" release/wgsToLv03.deno.js
sed -i "2i // ndj v$new_version" release/wgsToLv95.deno.js

sed -i "2i // ndj v$new_version" release/lv03ToWgs.node.js
sed -i "2i // ndj v$new_version" release/lv95ToWgs.node.js
sed -i "2i // ndj v$new_version" release/wgsToLv03.node.js
sed -i "2i // ndj v$new_version" release/wgsToLv95.node.js

echo "Released ndj v$new_version"
