import { dog } from './../selfDog';
import { createConstructor, isNode } from 'a-js-tools';
import {
  DevContextHookFn,
  DevTool,
  InitDevOption,
  OriginDevTool,
} from './types';
import { csi } from '../csi';
import pen from 'color-pen';
import { isAsyncFunction, isFunction, isGeneratorFunction } from 'a-type-of-js';

/**
 *
 * 创建 dev 的工厂函数
 *
 */
function Dev(this: OriginDevTool, options: InitDevOption): OriginDevTool {
  /**  是否跳过  */
  const _skip = options?.skip ?? false;

  /**
   *  自身之行要之行的 before
   *
   *  通过
   */
  const callList: {
    before: (DevContextHookFn | undefined)[];
    after: (DevContextHookFn | undefined)[];
  } = {
    before: [],
    after: [],
  };

  /**   */
  const _dev = async (message: string, callBack: (it: DevTool) => void) => {
    /**  跳过执行  */
    if (_skip) {
      /**  node 打印彩色  */
      if (isNode()) console.log(`⎆ ${csi}38;5;245m跳过执行 ${message}${csi}0m`);
      /**  浏览器环境打印彩色  */ else
        console.log(`⎆ %c跳过执行 ${message}`, 'color: #666;');
      return;
    }
    console.log(pen.red(message), '*********');

    // try {
    //   // 执行父级执行前
    //   await executivePlant(options?.before);
    // } catch (error) {
    //   console.log(error);
    // }
    for (const fn of callList.before) {
      try {
        // 执行自身的执行前钩子
        if (isFunction(fn) || isGeneratorFunction(fn)) {
          Reflect.apply(fn, null, []);
        } else if (isAsyncFunction(fn)) {
          await Reflect.apply(fn, null, []);
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      /**  node 环境打印  */
      if (isNode()) console.log(`⎆ ${csi}38;5;2m执行 ${message}${csi}0m`);
      else console.log(`⎆ %c执行 ${message}`, 'color: #4f3;');

      const newOption = {
        skip: false,
        before: [],
        after: [],
      };

      for (const fn of newOption.before) {
        try {
          // 执行自身的执行前钩子
          if (isFunction(fn) || isGeneratorFunction(fn)) {
            Reflect.apply(fn, null, []);
          } else if (isAsyncFunction(fn)) {
            await Reflect.apply(fn, null, []);
          }
        } catch (error) {
          console.log(error);
        }
      }
      const newThis = new DevConstructor(newOption) as unknown as DevTool;
      // 执行主方法
      if (isFunction(callBack) || isGeneratorFunction(callBack)) {
        Reflect.apply(callBack, newThis, [newThis]);
      } else if (isAsyncFunction(callBack)) {
        await Reflect.apply(callBack, newThis, [newThis]);
      }

      for (const fn of newOption.after.reverse()) {
        try {
          // 执行自身的执行前钩子
          if (isFunction(fn) || isGeneratorFunction(fn)) {
            Reflect.apply(fn, null, []);
          } else if (isAsyncFunction(fn)) {
            await Reflect.apply(fn, null, []);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      dog.error('执行事件出错', error);
      if (isNode()) console.log(`${csi}38;5;5m执行 ${message} ❌ ${csi}0m`);
      else console.log(`%c跳过执行 ${message} ❌`, 'color: #c918c9;');
      console.log(error);
    }
    for (const fn of callList.after.reverse()) {
      try {
        if (isFunction(fn) || isGeneratorFunction(fn)) {
          Reflect.apply(fn, null, []);
        } else if (isAsyncFunction(fn)) {
          await Reflect.apply(fn, null, []);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  Object.setPrototypeOf(_dev, this);
  Object.defineProperties(_dev, {
    skip: {
      get() {
        return new DevConstructor({
          /**  为了方便之后的扩展，使用参数进行处理数据  */
          before: [],
          after: [],
          skip: true,
        }) as unknown as DevTool;
      },
    },
    before: {
      get() {
        return async (fn?: DevContextHookFn) => options.before.push(fn);
      },
    },
    after: {
      get() {
        return (fn?: DevContextHookFn) => options.after.push(fn);
      },
    },
    beforeEach: {
      get() {
        return (fn?: DevContextHookFn) => callList.before.push(fn);
      },
    },
    afterEach: {
      get() {
        return (fn?: DevContextHookFn) => callList.after.push(fn);
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
