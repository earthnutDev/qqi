#!/bin/bash


tag=''

if ! tag=$(npx ./dist c=. 2>&1); then
  echo "校验版本失败 ${tag}"
else 
  echo "获取有效的 tag 值： ${tag}"
fi
