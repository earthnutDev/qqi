# qqi

通过 `node:os` 的 `homedir` 获取当前用户的主目录。但受到用户的环境变量和系统配置的影响，该值返回可能非预期值。

## 安装

```bash
npm install  --save qqi
```

## 使用

### 读

```ts
import { QQI } from 'qqi';

/**
 *
 * 创建用户目录下的 `~/.earthnut.dev.data/test/`  的读写机
 *
 * 若没有找到用户目录，则抛出错误
 */
const qqi = new QQI('test');

/**
 *
 * 读取 `~/.earthnut.dev.data/test/test` 文件，返回的是 JSON 格式
 *
 * 如若数据无法被 `JSON.stringify`、`JSON.parse` 则报错
 */
const content = qqi.read<{ test: string }>('test');
```

### 写

```ts
import { QQI } from 'qqi';

// 同上
const qqi = new QQI('test');

// 将向文件 `~/.earthnut.dev.data/test/test` 写入内容 `{"a":10}`
qqi.write('test', { a: 10 });
```

## 文档地址

[@qqi/rollup-external](https://earthnut.dev/qqi/rollup-external)
