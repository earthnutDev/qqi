import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';

export default {
  input: './index.ts',
  output: {
    format: 'es',
    entryFileNames: 'bin.mjs',
    preserveModules: true,
    sourcemap: false,
    exports: 'named',
    dir: 'dist/',
  },
  // 配置需要排除的包
  external: external({
    exclude: ['node:', 'a-'],
  }),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({
      tsconfig: './tsconfig.rollup.json',
    }),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
