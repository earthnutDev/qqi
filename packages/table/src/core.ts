import { createHeaderProto } from './proto/createHeaderProto';
import { parse } from './parse/parse';
import { parseRow } from './parse/parseRow';
import { QQITable, QQITableOptions, QQITableRowOption } from './types';
import { render } from './build';

/**  构建一个用于控制台的表格  */
export function table(this: QQITable, options?: QQITableOptions): QQITable {
  /**  构建初始化配置的表单  */
  const [tableEle, tablePro] = parse(options);
  /**
   * 核心技能
   *
   *  这里将构建表格
   *
   *
   */
  const core = () => render(tableEle);

  Object.setPrototypeOf(core, this);

  Object.defineProperties(core, {
    addRow: {
      value: (data: QQITableRowOption) => {
        tableEle.body.push(parseRow(data, tablePro));
        return core;
      },
      configurable: false,
      writable: false,
      enumerable: false,
    },
    setHeader: {
      value: (data: QQITableRowOption) => {
        tableEle.header = parseRow(data, createHeaderProto(tablePro));
        return core;
      },
      configurable: false,
      writable: false,
      enumerable: false,
    },
  });

  return core as QQITable;
}
