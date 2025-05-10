#!/bin/bash

echo 'hello'

# cd dist

tag=$(npx ./dist  c=. 2>&1)
exit_code=$?


echo "执行返回值 ${exit_code}"
echo "执行打印值 ${tag}"