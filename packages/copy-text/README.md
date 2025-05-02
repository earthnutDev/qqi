# qqi copy-text

将文本复制到剪切板

仅支持 windows、macOs 的 node 环境

## 安装

```bash
npm install --save @qqi/copy-text
```

## 使用

```ts
import { copyTextToClipboard } from '@qqi/copy-text';

await copyTextToClipboard('hello world');
```
