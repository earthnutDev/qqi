import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

export default {
  input: './index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: 'index.mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/',
    },
    //  若是生成 `bin` 类型，或是生成的文件不包含 commonJs，下面导出 commonJs 的配置可是删除
    {
      format: 'cjs',
      entryFileNames: 'index.cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist',
    },
  ],
  // 配置需要排除的包
  external: id =>
    /^(node:)|^(tslib)|^(a-js-tools)|^(a-node-tools)|^(a-command)/.test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({
      tsconfig: './tsconfig.rollup.json',
    }),
    cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
