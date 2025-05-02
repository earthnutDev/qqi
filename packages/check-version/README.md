# qqi check-version

一个简单的本地版本检测工具

## 安装

```bash
npm install --save @qqi/check-version
```

## 使用

默认使用方式为传入 `name` 参数，代码将执行判断工作目录下的 'packages/[name]' 子 npm 包的版本号是否已存在于线上

```bash
npx @qqi/check-version name=[name]

npx @qqi/check-version n=[name]
```

也可以传入 `cwd` 参数覆盖默认的判断文件夹，默认查找 'packages' 文件夹下子 npm 包，若您习惯于其他命名方式

```bash
# 倘若子主包 core 在 pkgs 文件夹下
npx @qqi/.check-version name=core cwd=pkgs

npx @qqi/.check-version n=core c=pkgs
```

使用 skip 参数是否跳过执行线上版本检测（因为 '0.0.0' 的版本默认为跳过检测，若初始版本非 '0.0.0' 时 ，也可以使用该参数跳过检测）

```bash
# 倘若子主包 core 在 pkgs 文件夹下
npx @qqi/.check-version name=core cwd=pkgs skip

npx @qqi/.check-version n=core c=pkgs s
```

## 文档位置

[@qqi/check-version](https://earthnut.dev/qqi/check-version)
