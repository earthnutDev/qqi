import { createConstructor } from 'a-js-tools';
import { QQITableCommonOption, QQITableEle } from '../types';

/** TableEleClass 类，原始构建类   */
export const TableEleClass = createConstructor(function (
  this: QQITableEle,
  proto: QQITableCommonOption,
): QQITableEle {
  this.body = [];
  this.header = undefined;

  Object.setPrototypeOf(this, proto);
  return this;
});
