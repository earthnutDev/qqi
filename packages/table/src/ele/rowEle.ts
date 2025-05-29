import { createConstructor } from 'a-js-tools';
import { QQITableCommonOption, QQITableRow } from '../types';

/**  构建行 原始类  */
export const RowEleClass = createConstructor(function (
  this: QQITableRow,
  proto: QQITableCommonOption,
): QQITableRow {
  this.data = [];

  Object.setPrototypeOf(this, proto);

  return this;
});
