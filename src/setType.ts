import { DevLogType } from './type';

export const typeList: DevLogType[] = [
  false,
  true,
  'all',
  'info',
  'error',
  'warn',
];

/**
 * 设置 type 的类型
 */
export function setType(type: DevLogType) {
  if (typeList.includes(type)) return type;
  return false;
}
