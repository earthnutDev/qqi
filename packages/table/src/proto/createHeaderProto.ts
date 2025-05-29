import { RowProto } from '../parse/parseRow';
import { QQITableBorder, QQITableCommonOption } from '../types';

/** 表头  */
class HeaderProto extends RowProto {
  border: QQITableBorder = {
    left: {
      style: 'bold',
      color: undefined,
    },
    right: {
      style: 'bold',
      color: undefined,
    },
    top: {
      style: 'bold',
      color: undefined,
    },
    bottom: {
      style: 'bold',
      color: undefined,
    },
  };
}

/**  设置 header 的原型  */
export function createHeaderProto(
  tableProto: QQITableCommonOption,
): QQITableCommonOption {
  const headerProto = new HeaderProto();

  Object.setPrototypeOf(headerProto, tableProto);

  return headerProto;
}
