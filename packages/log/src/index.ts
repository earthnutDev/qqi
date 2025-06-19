import { createConstructor, getRandomString } from 'a-js-tools';
import { DevLog, DevLogType, DogOptions, PrivateFunc } from './type';
import { setType } from './setType';
import { blankCall } from './blankCall';
import { managePrint } from './managePrint';
import { isString, isUndefined } from 'a-type-of-js';
import { platform } from './platform';
import { esc } from '@color-pen/static';

/**
 *
 * 创建 dev log 工厂函数
 *
 * @param options - 配置项
 * @returns - dev log 工厂函数
 *
 *
 */
function Dog(this: DevLog, options?: DogOptions): DevLog {
  let { name = '', type = false } = options || {};
  // 处理 name
  name = isString(name)
    ? name.trim().replace(/\s+/g, '_')
    : getRandomString(10);

  const _env =
    (platform === 'node' &&
      (process.env[name.toUpperCase().concat('_DEV')] ??
        process.env[name.toLowerCase().concat('_dev')])) ||
    false;
  const env =
    isUndefined(_env) || _env === 'false'
      ? false
      : _env === 'true'
        ? true
        : (_env as DevLogType);

  /**  私有属性  */
  type = setType(env ?? type);

  /// 原始的调用方法，在 type 值变化时会触发该值的更替
  // 私有方法 error
  const _privateFunc: PrivateFunc = {
    error: blankCall,
    warn: blankCall,
    info: blankCall,
  };

  managePrint(type, _privateFunc, name);

  /**  本体方法  */
  const dog = (...str: unknown[]) => {
    Reflect.apply(_privateFunc.info, this, str);
  };

  // 设置 prototype
  Object.setPrototypeOf(dog, this);

  // 设置属性和方法
  Object.defineProperties(this, {
    type: {
      get() {
        return type || false;
      },
      set(type: DevLogType) {
        const new_type = setType(type);
        if (new_type !== type) {
          type = new_type;
          managePrint(new_type, _privateFunc, name);
        }
      },
    },
    error: {
      value: (...str: unknown[]) =>
        Reflect.apply(_privateFunc.error, this, str),
      configurable: false,
      enumerable: false,
      writable: false,
    },
    warn: {
      value: (...str: unknown[]) => Reflect.apply(_privateFunc.warn, this, str),
      configurable: false,
      enumerable: false,
      writable: false,
    },
  });

  return dog as unknown as DevLog;
}

Dog.prototype.clear = () => {
  if (platform === 'browser') {
    console.clear();
  } else {
    console.log(esc.concat('c'));
  }
};

/**
 *
 * @param options 配置项
 * @returns 函数对象
 *
 */
const DogConstructor = createConstructor(Dog);

export { DogConstructor as Dog };
