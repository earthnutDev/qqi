import { QQITableBorder, QQITableCommon, QQITableContentAlign } from './types';

/**  全局的属性  */
class QQITableGlobalData {
  align: QQITableContentAlign = 'left';
  color: string = '';
  bgColor: string = '';
  bold: boolean = false;
  underline: boolean = false;
  italic: boolean = false;
  border: QQITableBorder = {
    left: {
      color: undefined,
      style: 'simple',
    },
    right: {
      color: undefined,
      style: 'simple',
    },
    top: {
      color: undefined,
      style: 'simple',
    },
    bottom: {
      color: undefined,
      style: 'simple',
    },
  };
}

/**
 *
 * 全局 table 配置
 *
 * 若没有其他特殊说名，将使用该数据作为最终的渲染依据
 *
 * 即为默认属性
 */
export const globalData: QQITableCommon & { border: QQITableBorder } =
  new QQITableGlobalData();
