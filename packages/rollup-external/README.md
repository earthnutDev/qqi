# qqi rollup-external

一个简单的 rollup 构建打包时的排除外部依赖的函数（多用于构建 npm 库包）

因为我在构建新的 npm 库包时，常因不仔细导致包

## 安装

```bash
npm install  --save-dev @qqi/rollup-external
```

## 使用

在 `rollup.config.js` 文件中配置：

```js
.... 其他引用
import { external } from '@qqi/rollup-external';
.... 其他代码逻辑

export default {
  ... 其他配置,
  external: external({
    // 默认排除 package.json 中 dependencies 的依赖
    // 排除 `node:`、`a-`、`color-pen` 、`@qqi`开头的依赖
    exclude: ["node:", "a-" ,"color-pen", "@qqi/"],
    // 忽略 `node:` 开头的包在 package.json 中未声明的 dependencies 的依赖
    // 未配置改项，若项目中包含 `node:`
    ignore: ["node:"],
    // 一定要包含的依赖，将被打包入打包文件夹内
    //  或是使用 `src/` 等路径，则报错 “依赖未被排除，打包关闭”
    include: ['@qqi/copy-text','src/utils', 'src/dog']
  }),
  ... 其他配置,

}

```

- 默认读取 `package.json` 中的 `dependencies` 和 `peerDependencies` 的依赖项作为 `exclude` 的值，即改值一般无需配置
- `include` 使用的全量对比，且优先级要远远高于 `exclude` 和 `ignore` 的配置，若在 `dependencies` 中配置了某依赖却又想将该依赖包含在打包文件内时可使用 `include`（但是需注意包会包含于 'node_modules' 文件夹下，保证 files 字段包含该项）
- `ignore` 用于忽略那些不包含于 'package.json' 的 `dependencies` 中却需要被排除的依赖，如 `node:`、`src/` 等路径的依赖。校验时以输入的字符串的 `startWith` 判断
- 可直接不使用参数，如果仅是想排除 'package.json' 文件中 `dependencies` 配置依赖 （怎么感觉有一股翻译腔）

## 文档地址

[@qqi/rollup-external](https://earthnut.dev/npm/qqi/rollup-external)
