#!/bin/bash

echo 'hello'

cd dist

tag=$(node ./bin.mjs c=. 2>&1)
exit_code=$?

if [ $exit_code -eq 0 ];then
  echo "$tag"
else 
  echo "$tag"
fi