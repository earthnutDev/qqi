#!/usr/bin/env node
import {
  getNpmPkgInfo,
  fileExist,
  pathJoin,
  readFileToJsonSync,
  _p,
  PackageJson,
} from 'a-node-tools';
import { isUndefined, isNull } from 'a-type-of-js';
import { Command } from 'a-command';

const command = new Command<{
  cwd: undefined;
  name: undefined;
  skip: undefined;
}>('@qqi/check-version');

command.bind([
  'cwd <c> (检测的工作文件夹的位置路径，缺省值为当前跟路径的 packages)',
  'skip <s> (跳过线上包版本检测， 默认值为 false)',
  'name <n> (检测的子包名)',
]);

command.run().isEnd(true);

const args = command.args.$map;

/**  工作的相对路径  */
const cwd = args.cwd?.value?.[0].toString() ?? 'packages';
/** 获取输入的包名   */
const name = args.name?.value?.[0].toString() ?? '';
/**  是否跳过检测  */
const skip = args.skip?.value?.[0] !== false ? true : false;

/**  未检测到输入的包名，则返回 false  */
if (isUndefined(name) || name === '') {
  _p('为检测到输入的包名');
  process.exit(1);
}

/**  文件路径  */
const filePath = pathJoin(process.cwd(), cwd, name, 'package.json');

/**  文件路径  */
const fileIsExist = fileExist(filePath);

if (isUndefined(fileIsExist)) {
  _p(`${filePath} 文件路径不存在`);
  process.exit(1);
}

const fileContent = readFileToJsonSync<PackageJson>(filePath);

if (isNull(fileContent)) {
  _p(`读取 ${filePath} 出错`);
  process.exit(1);
}
if (!fileContent.name || !fileContent.version) {
  _p(`读取 ${filePath} 出错，未找到包名或版本号`);
  process.exit(1);
}

if (skip || fileContent.version === '0.0.0') {
  _p(true);
  process.exit(0);
}

const pkgInfo = await getNpmPkgInfo(fileContent.name);

// 包数据未找到或是版本号已存在则返回
if (isNull(pkgInfo.data)) {
  _p(`${fileContent.name} 包未找到`);
  process.exit(1);
}
// 包数据未找到或是版本号已存在则返回
if (pkgInfo.data.time[fileContent.version]) {
  _p(`${fileContent.name} 包版本号已存在`);
  process.exit(1);
}

_p(true);
process.exit(0);
