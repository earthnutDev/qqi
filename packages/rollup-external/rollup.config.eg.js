import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

export default {
  input: './eg/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: 'index.mjs',
      preserveModules: false,
      sourcemap: false,
      exports: 'named',
      dir: '.eg/',
    },
  ],
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
