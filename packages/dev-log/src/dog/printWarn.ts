import { parseError } from './parseError';

/**
 *
 * 打印 warn 信息
 *
 */
export function printWarn(...str: unknown[]) {
  parseError('warn');
  console.warn(...str);
}
