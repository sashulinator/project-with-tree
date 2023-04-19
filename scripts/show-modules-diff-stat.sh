#!/usr/bin/env bash

MODULE_FILE_PATH="$(dirname -- "$0")/../modules"

tr -d '\r' < "$MODULE_FILE_PATH" | 
while read path remote repo; do
  echo "---- Fetching remote \"$remote\"... ----"
  git fetch $remote master
  git --no-pager diff --stat "$remote/master" "master:$path"
  echo '-----------------------------------------'
done