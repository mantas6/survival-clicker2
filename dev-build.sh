#!/bin/bash

# Automatically fetches updates from the repo and builds them

# First argument is path to repository files
# Second argument is public folder of the web server

cd $1

changed=0
git remote update && git status -uno | grep -q 'Your branch is behind' && changed=1

if [ $changed = 1 ]; then
    git checkout -- .
    git pull origin master
    npm i

    if ! npm run build; then
      echo "Build has failed"
      exit 1
    fi

    # If success copy files to public
    rm -rf $2/*
    cp -a $1/dist/. $2/

    echo "Updated successfully"
else
    echo "Up-to-date"
fi
