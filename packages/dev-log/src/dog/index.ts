import { createConstructor, getRandomString } from 'a-js-tools';
import { DevLog, DevLogType, DogOptions, PrivateFunc } from './type';
import { setType } from './setType';
import { blankCall } from './blankCall';
import { managePrint } from './managePrint';
import { isString } from 'a-type-of-js';

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
  const { name = '', type = false } = options || {};
  /**  名字  */
  const _name = isString(name)
    ? name.trim().replace(/\s+/g, '_')
    : getRandomString(10);
  /**  私有属性  */
  let _type = setType(type);

  // 私有方法 error
  const _privateFunc: PrivateFunc = {
    error: blankCall,
    warn: blankCall,
    info: blankCall,
  };

  managePrint(_type, _privateFunc, _name);

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
        return _type || false;
      },
      set(type: DevLogType) {
        const new_type = setType(type);
        if (new_type !== _type) {
          _type = new_type;
          managePrint(new_type, _privateFunc, _name);
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

Dog.prototype.clear = () => console.clear();

/**
 *
 * @param options 配置项
 * @returns 函数对象
 *
 */
const DogConstructor = createConstructor(Dog);

export { DogConstructor as Dog };
