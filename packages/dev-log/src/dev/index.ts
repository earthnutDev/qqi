import { dog } from './../selfDog';
import { createConstructor, isNode } from 'a-js-tools';
import { DevTool, InitDevOption } from './types';
import { isAsyncFunction, isFunction, isGeneratorFunction } from 'a-type-of-js';
import { csi } from '../csi';

/**
 *
 * 创建 dev 的工厂函数
 *
 */
function Dev(this: DevTool, options?: InitDevOption): DevTool {
  /**  是否跳过  */
  const _skip = options?.skip ?? false;

  /**   */
  const _dev = async (message: string, callBack: (it: DevTool) => void) => {
    if (_skip) {
      if (isNode()) console.log(`⎆ ${csi}38;5;245m跳过执行 ${message}${csi}0m`);
      else console.log(`⎆ %c跳过执行 ${message}`, 'color: #666;');
      return;
    }

    try {
      if (isNode()) console.log(`⎆ ${csi}38;5;2m执行 ${message}${csi}0m`);
      else console.log(`⎆ %c执行 ${message}`, 'color: #4f3;');

      const newThis = new DevConstructor({ ...options });
      if (isFunction(callBack) || isGeneratorFunction(callBack)) {
        Reflect.apply(callBack, newThis, [newThis]);
      } else if (isAsyncFunction(callBack)) {
        await Reflect.apply(callBack, newThis, [newThis]);
      }
    } catch (error) {
      dog.error('执行事件出错', error);
      if (isNode()) console.log(`${csi}38;5;5m执行 ${message} ❌ ${csi}0m`);
      else console.log(`%c跳过执行 ${message} ❌`, 'color: #c918c9;');
      console.log(error);
    }
  };

  Object.setPrototypeOf(_dev, this);
  Object.defineProperties(_dev, {
    skip: {
      get() {
        return new DevConstructor({
          /**  为了方便之后的扩展，使用参数进行处理数据  */
          ...options,
          skip: true,
        });
      },
    },
  });

  return _dev as unknown as DevTool;
}

/**
 *
 * 装配 dev
 *
 */
const DevConstructor = createConstructor(Dev);

export { DevConstructor as Dev };
