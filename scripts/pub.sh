#!/bin/bash


# 获取环境变量中的变更包字符串
UPDATE_PACKAGES=$UPDATE_PACKAGES
# 执行根路径
REPO_ROOT=$REPO_ROOT

echo "🌬️ 来"

echo "工作根路径 $REPO_ROOT"

# 进入包工厂
if ! cd "${REPO_ROOT}/packages"; then 
    echo "进入 ${REPO_ROOT}/packages 文件夹失败"
    exit 1;
fi

echo "☁️ 来"

# 将字符串转为数组
IFS=',' read -r -a PACKAGE_ARRAY <<< "$UPDATE_PACKAGES"
 
update_version() {
    local input="$1"
    local NAME=$(echo "${input//-/ }" | tr -s ' ') # 替换 - 为空格并删除重复的空格
    local CWD="${REPO_ROOT}/packages/$input"
    if ! cd "$CWD"; then 
        echo "进入项目 $NAME 故障，路径为 ${CWD}"
        return 0
    fi

    npm ci
  
    if ! npm run build; then 
      echo "构建 $NAME 失败" 
      return 0
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
      echo "未找到 $NAME dist 构建码"
      return 0
    fi
    
    echo "开始发布 $NAME npm 包"
    if ! npm publish --provenance --access public --tag ${TAG} ; then
        echo "$NAME 发布失败" 
        return 0
    fi
    
    echo "🚀🚀 $NAME  发布成功，完结 🎉🎉 撒花 🎉🎉"
}

main() {
    echo ${UPDATE_PACKAGES}
    echo ${PACKAGE_ARRAY}
    # 遍历变更的包数组，进行 npm 包推送
    for package in "${PACKAGE_ARRAY[@]}"; do
        echo "当前执行的推送为 $package"
        update_version "$package"
    done   
}

echo "准备好了么"
main
echo "哈哈，执行 🎊 🎊 🎊"