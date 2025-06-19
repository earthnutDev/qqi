import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  main: 'index.cjs',
  module: 'index.mjs',
  types: 'index.d.ts',
  ...packageJson,
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  files: ['index.d.ts', 'index.mjs', 'index.cjs'],
  exports: {
    '.': {
      import: {
        default: './index.mjs',
        types: './index.d.ts',
      },
      require: {
        default: './index.cjs',
        types: './index.d.ts',
      },
    },
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/qqi/babel-plugin-remove-dog-calls.git',
  },
  author: {
    name: '🥜',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  browserslist: ['node>=18.0.0'],
  engines: {
    node: '>=18.0.0',
  },
  keywords: ['qqi/babel-plugin-remove-dog-calls'],
  homepage: 'https://earthnut.dev',
  bugs: {
    url: 'https://github.com/earthnutDev/qqi/babel-plugin-remove-dog-calls/issues',
    email: 'earthnut.dev@outlook.com',
  },
};

{
  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
