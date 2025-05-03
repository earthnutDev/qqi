#!/bin/bash

cd "packages/$1"

npm ci

npm run build || echo "构建失败" && exit 1

VERSION=$(node -p "require('./package.json').version")

echo "获取全称 npm version : $VERSION"
if [[ $VERSION =~ -([a-zA-Z0-9]+)(\.|$) ]]; then
  TAG=${BASH_REMATCH[1]}
  echo "捕获到 npm tag : $TAG"
else
  TAG="latest"
  echo "未捕获到 npm tag 设置了默认 : $TAG"
fi

if cd dist; then 
  echo "开始发布 npm 包"
  npm publish --provenance --access public --tag ${TAG} || echo "发布失败" && exit 1
else
  echo "未找到 dist 构建码"
fi
