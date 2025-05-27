import { isArray } from 'a-type-of-js';
import { TableEleClass } from './tableEle';
import { QQITable } from './types';

/**
 *
 */
export function parse(options: QQITable): TableEle {
  const tableEle = Object.assign(
    new TableEleClass(),
    isArray(options) ? { body: options } : options,
  );

  const globalAlign = tableEle.align;
}
