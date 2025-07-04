export default function (api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: ['@babel/plugin-transform-runtime', './dist/index.mjs'],
  };
}
