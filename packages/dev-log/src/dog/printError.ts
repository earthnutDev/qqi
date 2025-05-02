import { parseError } from './parseError';
/**
 *
 * 打印 error 信息
 *
 */
export function printError(...str: unknown[]) {
  parseError('error');
  console.error(...str);
}
