import { DevLogType } from './type';

/**
 * 设置 type 的类型
 */
export function setType(type: DevLogType) {
  if ([false, true, 'all', 'info', 'error', 'warn'].includes(type)) return type;
  return false;
}
