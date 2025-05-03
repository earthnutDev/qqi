#!/bin/bash

cd "packages/$1"

npm ci

if ! npm run build; then 
  echo "构建失败" 
  exit 1
fi

VERSION=$(node -p "require('./package.json').version")

echo "获取全称 npm version : $VERSION"
if [[ $VERSION =~ -([a-zA-Z0-9]+)(\.|$) ]]; then
  TAG=${BASH_REMATCH[1]}
  echo "捕获到 npm tag : $TAG"
else
  TAG="latest"
  echo "未捕获到 npm tag 使用默认 : $TAG"
fi

if ! cd dist; then 
  echo "未找到 dist 构建码"
  exit 1
fi

echo "开始发布 npm 包"

if ! npm publish --provenance --access public --tag ${TAG} ; then
    echo "发布失败" 
    exit 1
fi

