import { isUndefined } from 'a-type-of-js';
import { notSupport } from './notSupport';
import { platform } from './platform';
import { DevLogType, PrivateFunc } from './type';
import { blankCall } from './blankCall';

/**  管理是否打印  */
export function managePrint(
  type: DevLogType,
  privateFunc: PrivateFunc,
  name: string,
) {
  if (platform === 'node') {
    const dev =
      process.env[name.toUpperCase().concat('_DEV')] ||
      process.env[name.toLowerCase().concat('_dev')];
    /// 当前禁止使用打印
    /// node 环境未配置 NAME_DEV 环境变量
    /// 显式配置 NAME_DEV 环境变量为 false
    if (type === false || isUndefined(dev) || dev === 'false') {
      return Reflect.apply(notSupport, privateFunc, []);
    }
    if (type === 'all' || type === 'info') {
      privateFunc.info = function (...str: unknown[]) {
        try {
          throw new Error();
        } catch (error) {
          console.log(error);
        }
        console.info(...str);
      };
    } else {
      privateFunc.info = blankCall;
    }
    if (type === 'all' || type === 'error') {
      privateFunc.error = console.error;
    } else {
      privateFunc.error = blankCall;
    }

    if (type === 'all' || type === 'warn') {
      privateFunc.warn = console.warn;
    } else {
      privateFunc.warn = blankCall;
    }
  } else {
    Reflect.apply(notSupport, privateFunc, []);
  }
}
