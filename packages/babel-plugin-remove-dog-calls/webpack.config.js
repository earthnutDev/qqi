import webpack from 'webpack';
import path from 'node:path';

const __dirname = import.meta.dirname;

export const pathJoin = str => path.join(__dirname, str);

/**
 *
 * 生产包打包为 cjs 、mjs
 *
 */
export default function () {
  /** 入口 */
  const entry = {
    index: {
      import: ['./eg/index.ts'],
      filename: '.eg/index.mjs',
    },
  };
  /**
   * 出口
   */
  const output = {
    path: pathJoin('.eg'),
    filename: `[name]/index.mjs`,
  };

  /** 模块解析方式 */
  const resolve = {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss'],
    alias: {
      dog: pathJoin('dog.ts'),
    },
  };

  const externals = {
    'color-pen': 'color-pen',
    '@color-pen/static': '@color-pen/static',
    'a-type-of-js': 'a-type-of-js',
    'a-js-tools': 'a-js-tools',
    '@qqi/log': '@qqi/log',
  };

  /** 模块配置 */
  const module = {
    rules: [
      // 配置 ts loader
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  };

  /** 插件 */
  const plugins = [];

  /** 优化配置 */
  const optimization = {
    minimize: false,
    usedExports: false,
    sideEffects: false,
  };
  /**
   *
   */
  const config = {
    entry,
    output,
    resolve,
    module,
    plugins,
    optimization,
    mode: 'development',
    externals,
    devtool: false,
  };

  return config;
}
