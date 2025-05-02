# @qqi/dev-log

[![version](<https://img.shields.io/npm/v/@qqi/dev-log.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/@qqi/dev-log) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/@qqi/dev-log?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/@qqi/dev-log?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/@qqi/dev-log/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/@qqi/dev-log) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/@qqi/dev-log/issues)

一个用于开发的时候打印日志的工具，本质就是 `console` 的封装。

## 安装

```bash
npm install @qqi/dev-log --save
```

## 使用 Dog

### 创建全局的 `dog` (dev log 的缩写，天才第一步，起名要认真) 对象

```ts
/// 这里假设以 `a node tools` 为 `name` 的值
export const dog = new Dog({ name: 'a node tools' });
```

### 在需要打印日志的地方引入 `dog` 对象

```ts
import { dog } from './dog';

dog('你好'); // 该值是否打印还依赖于环境变量中有没有配置 `dev_log_dev` 的值
```

### 启用配置

```bash
# 配置 name 为 'a node tools'，则使用 `a_node_tools_dev` 或 `A_NODE_TOOLS_DEV` 来启动
a_node_tools_dev=true npm run dev
```

## 使用 dev

在单元测试的时候使用 `jest` ，在功能测试时使用 `node:test` 和 `node:assert`。但是测试的时候，总是有打印的消息被 `node:test` 的结果覆盖。所以，写了一个简介的 dev ，用于功能测试。

类似于 `node:test`，使用如下：

```ts
import { dev } from '@qqi/dev-log';

const log = console.log;

// 简单使用
dev('测试 1', () => {
  log(1);
});

// 我其实就是想能够跳过测试而不是每一次 ((skip)=>{ if(skip) return; ....})(false)
dev.skip('跳过的测试', () => {
  log('我并不会被打印出来');
});

// 子测试，每一个测试是独立的，类似于 jest，单独的测试模块出现 Error 将阻止剩余逻辑执行
dev('包含子项的测试', it => {
  it('子项 1️⃣', () => {
    log('我要出错');
    throw new Error('我粗错了');
    log('完啦，我打印不出来了');
  });

  it('子项 2️⃣', () => {
    log('没想到吧，我还活着');
  });
});

// 可以异步执行
dev('测试异步的代码', async it => {
  it('测试异代码 2️⃣ ', async () => {
    log('异步代码 2️⃣ 外部');
    return new Promise(resolve => {
      log('异步代码 2️⃣ 内部');
      setTimeout(() => {
        log('异步代码 2️⃣');
        resolve('异步代码 2️⃣');
      }, 500);
    });
  });

  await it<string>('测试异代码 1️⃣ ', async () => {
    log('异步代码 1️⃣ 外部');
    return new Promise(resolve => {
      log('异步代码 1️⃣ 内部');
      setTimeout(() => {
        log('异步代码 1️⃣');

        resolve('异步代码 1️⃣');
      }, 1000);
    });
  });
});
```

## 文档地址

参看 [https://earthnut.dev/qqi_dev-log/](https://earthnut.dev/qqi_dev-log/)
