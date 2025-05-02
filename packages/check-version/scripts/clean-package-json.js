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
  ...packageJson,
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  files: ['bin.mjs'],
  keywords: ['@qqi/check-version', '@qqi'],
  homepage: 'https://earthnut.dev/qqi/check-version',
  bugs: {
    url: 'https://github.com/earthnutDev/qqi/issues',
    email: 'earthnut.dev@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/qqi.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    '@qqi/check-version': './bin.mjs',
  },
};

{
  //  写入 package.json

  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
