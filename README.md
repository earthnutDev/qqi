# @qqi/dev-log

[![version](<https://img.shields.io/npm/v/@qqi/dev-log.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/@qqi/dev-log) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/@qqi/dev-log?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/@qqi/dev-log?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/@qqi/dev-log/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/@qqi/dev-log) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/@qqi/dev-log/issues)

一个用于开发的时候打印日志的工具，本质就是 `console` 的封装。

## 安装

```bash
npm install @qqi/dev-log --save
```

## 使用

### 创建全局的 `dog` (dev log 的缩写，天才第一步，起名要认真) 对象

```ts
export const dog = new Dog(process.env.NODE_ENV);
```

### 在需要打印日志的地方引入 `dog` 对象

```ts
import { dog } from './dog';

dog('你好'); //
```

## 文档地址

参看 [https://earthnut.dev/jja_dev-log/](https://earthnut.dev/jja_dev-log/)
