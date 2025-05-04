import { isAsyncFunction, isFunction, isGeneratorFunction } from 'a-type-of-js';
import { DevContextHookFn } from './types';

/**
 *
 * 函数执行工厂
 *
 */
export async function executivePlant(
  fn: DevContextHookFn | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArgument: any = null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  argumentsList: any[] = [],
) {
  if (isFunction(fn) || isGeneratorFunction(fn)) {
    Reflect.apply(fn, thisArgument, argumentsList);
  } else if (isAsyncFunction(fn)) {
    await Reflect.apply(fn, thisArgument, argumentsList);
  }
}
