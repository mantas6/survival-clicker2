#!/bin/bash

# Automatically fetches updates from the repo and builds them

git checkout -- .
git pull origin master
npm i
npm run build