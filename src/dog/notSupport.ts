import { blankCall } from './blankCall';
import { PrivateFunc } from './type';

/**
 * 当前环境不支持
 *
 * 三个方法都是空方法
 */
export function notSupport(this: PrivateFunc) {
  this.error = this.info = this.warn = blankCall;
}
