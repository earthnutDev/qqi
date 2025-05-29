import { isPlainObject, isType, isUndefined } from 'a-type-of-js';
import {
  QQITableCell,
  QQITableCellValue,
  QQITableCommonOption,
  QQITableRowOptionData,
} from '../types';
import { setPro } from '../proto/setPro';

/**  解析为单元格  */
export function parseCell(
  data: QQITableRowOptionData,
  parentPro: QQITableCommonOption,
): QQITableCell | undefined {
  // 空值直接返回空
  if (isUndefined(data)) {
    return undefined;
  }
  // 直接值转化为对象值，方便后续统一处理
  if (isType<QQITableCellValue>(data, i => !isPlainObject(i))) {
    data = {
      content: data,
    };
  }
  /**  单元格的属性  */
  const cell: QQITableCell = {
    content: data.content,
  } as QQITableCell; // 其他的属性在下面的 `setPro` 中进行给值
  setPro(cell, data); // 构建属性的值
  Object.setPrototypeOf(cell, parentPro);
  return cell;
}
