import { createConstructor } from 'a-js-tools';
import { TableEle } from './types';

/** TableEleClass 类，原始   */
export const TableEleClass = createConstructor(function (
  this: TableEle,
): TableEle {
  this.align = 'left';
  this.body = [];
  this.header = [];
  this.border = {
    left: {
      style: 'simple',
      color: undefined,
    },
    right: {
      style: 'simple',
      color: undefined,
    },
    top: {
      style: 'simple',
      color: undefined,
    },
    bottom: {
      style: 'simple',
      color: undefined,
    },
  };

  return this;
});
