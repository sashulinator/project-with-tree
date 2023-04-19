#!/usr/bin/env bash

MODULE_FILE_PATH="$(dirname -- "$0")/../modules"

tr -d '\r' < "$MODULE_FILE_PATH" | 
while read path remote repo; do
  git remote add $remote $repo
done