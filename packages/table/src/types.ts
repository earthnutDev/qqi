/**  表格的单元格的内容数据格式  */
export type QQITableCellValue = string | number | undefined | boolean | null;

/**   表格的边框样式 (当前版本仅 `simple`、`undefined` 值可用) */
export type QQITableBorderStyle =
  | undefined
  | 'simple'
  | 'bold'
  | 'double'
  | 'dash';

/**  表格的边框  */
export type QQITableBorder =
  | {
      style: QQITableBorderStyle;
      color: string | undefined;
    }
  | QQITableBorderStyle;

/**  表格的单边边框  */
export type QQITableUnilateralBorder = {
  left: QQITableBorder;
  right: QQITableBorder;
  top: QQITableBorder;
  bottom: QQITableBorder;
};

/**  文本对齐方式  */
export type QQITableContentAlign = 'left' | 'center' | 'right';

/**  表格的单元格配置  */
export type QQITableCell = {
  /**  内容（文本）  */
  content: QQITableCellValue;
  /**  对齐  */
  align: QQITableContentAlign;
  /**  文本色  */
  color: string;
  /**  背景色  */
  bgColor: string;
  /**  是否为粗体  */
  bold: boolean;
  /**  是否含下划线 */
  underline: boolean;
  /**  是否为斜文本  */
  italic: boolean;
  /**  边框  */
  border:
    | QQITableBorder
    | { [x in keyof QQITableUnilateralBorder]: QQITableUnilateralBorder[x] };
};

/**  表头  */
export type QQITableHeader = (
  | QQITableCellValue
  | ({ [x in keyof QQITableCell]?: QQITableCell[x] } & {
      [x in keyof QQITableUnilateralBorder]?: QQITableUnilateralBorder[x];
    })
  | undefined
)[];

/**  使用单元格  */
export type TableEle = {
  /**  表头  */
  header: (QQITableCell | undefined)[];
  /**  表干  */
  body: (QQITableCell | undefined)[];
  /**  对齐  */
  align: QQITableContentAlign;
  /**  边框  */
  border: QQITableUnilateralBorder;
};

/**  单元格  */
export type QQITable =
  | {
      /**  头部  */
      header?: QQITableHeader;
      /**  内容  */
      body?: QQITableHeader;
      /**  对齐  */
      align?: QQITableContentAlign;
      /**  配置全局（本表格所有单元格）文本色  */
      color?: string;
      /**  配置全局（本表格所有单元格）背景色  */
      bgColor?: string;
      /**  配置全局（本表格所有单元格）是否为粗体  */
      bold?: boolean;
      /**  配置全局（本表格所有单元格）是否含下划线 */
      underline?: boolean;
      /**  配置全局是否为斜文本  */
      italic?: boolean;
      /**  边框  */
      border?:
        | QQITableBorder
        | {
            [x in keyof QQITableUnilateralBorder]?: QQITableUnilateralBorder[x];
          };
    }
  | QQITableCellValue[];
