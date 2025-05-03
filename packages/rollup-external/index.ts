import { isArray, isNull, isUndefined } from 'a-type-of-js';
import {
  getDirectoryBy,
  PackageJson,
  pathJoin,
  readFileToJsonSync,
} from 'a-node-tools';
import { pen } from 'color-pen';

/**
 *
 * 依赖配置
 *
 */
export function external({
  exclude,
  ignore,
  include,
}: {
  /**  排除且在依赖项中的包  */
  exclude?: string[];
  /**  在排除的包却不需要在 dependencies  中的包，如： node:stream 等  */
  ignore?: string[];
  /**  包含的包（想打包入结果的包）  */
  include?: string[];
}) {
  const packageDir = getDirectoryBy('package.json', 'file');

  if (isUndefined(packageDir)) {
    throw new RangeError('package.json 文件不存在');
  }

  const packagePath = pathJoin(packageDir, 'package.json');
  /**  读取当前文件  */
  const packInfo = readFileToJsonSync<PackageJson>(packagePath);

  if (isNull(packInfo)) {
    throw new RangeError('package.json 文件不存在');
  }
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
        throw new RangeError(
          `${pen.bgRed.blink.bold.yellow(id)} 依赖被排除打包却未再 package.json 中配置`,
        );
      }
    } else {
      // 包不存在于配置中，但是却是非本地包
      if (/^[^./]/g.test(id)) {
        throw new RangeError(
          `${pen.bgRed.blink.bold.yellow(id)} 依赖未被排除，打包关闭`,
        );
      }
    }
    return result;
  };
}
