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
export type QQITableUnilateralBorder = {
  style: QQITableBorderStyle;
  color: string | undefined;
};

/**  配置单边边框属性  */
export type QQITableUnilateralBorderOptions = {
  [x in keyof QQITableUnilateralBorder]?: QQITableUnilateralBorder[x];
};

/**  表格的单边边框（最终解析）  */
export type QQITableBorder = {
  left: QQITableUnilateralBorder;
  right: QQITableUnilateralBorder;
  top: QQITableUnilateralBorder;
  bottom: QQITableUnilateralBorder;
};

/**  配置四个方向的边框  */
export type QQITableBorderOptions = {
  [x in keyof QQITableBorder]?: QQITableUnilateralBorderOptions;
};

/**  边框配置  */
export type QQIBorderOptions =
  | QQITableBorderStyle
  | QQITableBorderOptions
  | QQITableUnilateralBorderOptions;

/**  文本对齐方式  */
export type QQITableContentAlign = 'left' | 'center' | 'right';

/**  公有属性，继承制  */
export type QQITableCommon = {
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
};

/**  一个使用的简单的除数据外的属性  */
export type QQITableCommonOption = {
  [x in keyof QQITableCommon]?: QQITableCommon[x];
} & {
  border?: QQIBorderOptions;
};

/**  表格的单元格配置  */
export type QQITableCellNoBorder = {
  /**  内容（文本）  */
  content: QQITableCellValue;
} & QQITableCommon;

/**  带表格的单元格配置  */
export type QQITableCell = QQITableCellNoBorder & {
  border: QQITableBorder;
};

/**  单行  */
export type QQITableRow = {
  data: (QQITableCell | undefined)[];
} & QQITableCommon & {
    border: QQITableBorder;
  };

export type QQITableRowOptionData =
  | QQITableCellValue
  | ({ [x in keyof QQITableCellNoBorder]?: QQITableCellNoBorder[x] } & {
      border?: QQIBorderOptions;
    })
  | undefined;

/**  单行表数据  */
export type QQITableRowOption =
  | QQITableRowOptionData[]
  | ({
      data?: QQITableRowOptionData[];
    } & QQITableCommonOption);

/**  使用单元格  */
export type QQITableEle = {
  /**  表头  */
  header?: QQITableRow;
  /**  表干  */
  body: QQITableRow[];
} & QQITableCommon &
  QQITableBorder;

/**  单元格  */
export type QQITableOptions =
  | ({
      /**  头部  */
      header?: QQITableRowOption;
      /**  内容  */
      body?: QQITableRowOption[];
    } & QQITableCommonOption)
  | QQITableRowOption[]
  | undefined;

/**  表  */
export type QQITable = {
  /**  开始构建  */
  (): void;
} & {
  /**  添加表头  */
  setHeader(data: QQITableRowOption): QQITable;
  /**  添加行  */
  addRow(data: QQITableRowOption): QQITable;
};
