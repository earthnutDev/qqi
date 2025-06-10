import {
  isArray,
  isNull,
  isUndefined,
  isPlainObject,
  isString,
  isBusinessEmptyString,
} from 'a-type-of-js';
import {
  _p,
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { bgRedPen, hexPen } from 'color-pen';
import { copyTextToClipboard } from '@qqi/copy-text';

/**  一个展示 🖊️  */
const pen = bgRedPen.blink.bold.yellow;

/**
 *
 * 依赖配置
 *
 * - include   包含的包（想打包入结果的包）。优先级最高（譬如：src/ 这种需要 rollup 处理的）
 * - ignore  在排除的包却不需要在 dependencies 中的包，如: node:stream 等
 * - exclude  排除且在依赖项中的包（在构建发布后，不会因为依赖项缺失而导致包版本失效）
 *
 */
export function external(options?: {
  /**  排除且在依赖项中的包  */
  exclude?: string[] | string;
  /**  在排除的包却不需要在 dependencies  中的包，如： node:stream 等  */
  ignore?: string[] | string;
  /**  包含的包（想打包入结果的包）  */
  include?: string[] | string;
}) {
  if (isUndefined(options))
    options = {
      exclude: [],
      ignore: [],
      include: [],
    };

  if (!isPlainObject) return;
  if (isString(options.exclude)) options.exclude = [options.exclude];
  options.exclude?.forEach((e, i, a) => {
    if (isString(e)) a[i] = '';
  });
  options.exclude = options.exclude?.filter(e => !isBusinessEmptyString(e));
  if (isString(options.ignore)) options.ignore = [options.ignore];
  options.ignore?.forEach((e, i, a) => {
    if (isString(e)) a[i] = '';
  });
  options.ignore = options.ignore?.filter(e => !isBusinessEmptyString(e));
  if (isString(options.include)) options.include = [options.include];
  options.include?.forEach((e, i, a) => {
    if (isString(e)) a[i] = '';
  });
  options.include = options.include?.filter(e => !isBusinessEmptyString(e));

  const { exclude, ignore, include } = options;

  const packageDir = getDirectoryBy('package.json', 'file');

  if (isUndefined(packageDir)) throw new RangeError('package.json 文件不存在');

  const packagePath = pathJoin(packageDir, 'package.json');
  /**  读取当前文件  */
  const packInfo = readFileToJsonSync<PackageJson>(packagePath);

  if (isNull(packInfo)) throw new RangeError('package.json 文件不存在');

  /**  已配置的依赖  */
  const dependencies = Object.keys({
    ...(packInfo.dependencies || {}),
    ...(packInfo.preDependencies || {}),
  });

  const ignorePkg =
    isUndefined(ignore) || !isArray(ignore)
      ? dependencies
      : [...ignore, ...dependencies];
  /** 配置需要不打包进生产包的包名配置  */
  const excludedPkg =
    isUndefined(exclude) || !isArray(exclude) ? ['node:'] : exclude;

  const excludedRegExp = new RegExp(
    '^'.concat([...ignorePkg, ...excludedPkg].join('|^')),
  );
  const includedPkg = isUndefined(include) || !isArray(include) ? [] : include;

  return (id: string) => {
    if (includedPkg.includes(id)) return false;
    excludedRegExp.lastIndex = 0;
    const result = excludedRegExp.test(id);
    /// 保证排除的包纯在于
    if (result === true) {
      if (
        // 检测到了包名存在于配置中
        dependencies.includes(id) === false &&
        ignorePkg.every(e => !id.startsWith(e))
      ) {
        _p(`${pen(id)} ${copy(id)} 依赖被排除打包却未再 package.json 中配置`);
        process.exit(1);
      }
    }
    // 包不存在于配置中，但是却是非本地包
    else if (/^[^./]/g.test(id)) {
      _p(`${pen(id)}  ${copy(id)}  依赖未被排除，打包关闭`);
      process.exit(1);
    }
    return result;
  };
}

/**  复制  */
function copy(str: string) {
  return copyTextToClipboard(str) === str ? hexPen('#666')`已复制` : '';
}
