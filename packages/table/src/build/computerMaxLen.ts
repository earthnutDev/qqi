import { isNode } from 'a-js-tools';
import { QQITableEle } from '../types';
import { strInTerminalLength } from 'color-pen';

/**  计算得到最大的值  */
export function computerMaxLen(data: QQITableEle): number[] {
  const result: number[] = [];
  /**  计算  */
  if (data.header) {
    data.header.data.forEach((e, i) => {
      result[i] = Math.max(
        result[i] ?? 0,
        isNode()
          ? strInTerminalLength(e?.content?.toString() ?? '')
          : (e?.content?.toString() || '').length,
      );
    });
  }

  if (data.body) {
    data.body.forEach(row => {
      row.data.forEach((e, i) => {
        result[i] = Math.max(
          result[i] ?? 0,
          strInTerminalLength(e?.content?.toString() ?? ''),
        );
      });
    });
  }

  return result;
}
