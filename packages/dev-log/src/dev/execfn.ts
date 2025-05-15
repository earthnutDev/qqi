import { isAsyncFunction, isFunction, isGeneratorFunction } from 'a-type-of-js';
import { Dev } from './index';
import { DevContextHookFn } from './types';
/**
 *
 * 执行函数
 *
 * 现在以列队的方式执行，不考虑是否异步
 *
 */
export async function execFn(this: typeof Dev, fnArr: DevContextHookFn[]) {
  for (const fn of fnArr) {
    try {
      if (!fn) continue;
      if (isAsyncFunction(fn)) {
        await Reflect.apply(fn, this, [this]);
      } else if (isFunction(fn) || isGeneratorFunction(fn)) {
        Reflect.apply(fn, this, [this]);
      }
    } catch (error) {
      console.error('Hook执行出错:', error);
    }
  }
}
