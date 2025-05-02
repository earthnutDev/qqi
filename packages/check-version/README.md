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
```
