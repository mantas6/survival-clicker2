#!/bin/bash
archive_name='dist.tar.gz'

while true
do
  echo "Fetching data"

  data=$(curl -s 'https://api.github.com/repos/MantasPauliukonis/survival-clicker2/releases/latest')

  url=$(echo $data | jq -r '.assets[0].browser_download_url')
  version=$(echo $data | jq -r '.tag_name')

  echo "Remote version is $version"

  if [ "$version" != "$previous_version" ] && [ ! -z "$url" ]; then
    echo "Version mismatch $version != $previous_version"

    rm $archive_name

    echo "Downloading"

    if ! wget -O $archive_name $url; then
      exit 1
    fi

    rm -rf dist

    echo "Extracting"

    if ! tar xvzf $archive_name; then
      exit 1
    fi

    echo "Deploying"

    rm -rf public_html/*
    cp -a dist/. public_html

    previous_version=$version
  else
    echo "Already up-to-date $version"
  fi

  sleep 60
done