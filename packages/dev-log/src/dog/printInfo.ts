import { parseError } from './parseError';

/**
 *
 * 打印 info 消息
 *
 */
export function printInfo(...str: unknown[]) {
  parseError('info');
  console.info(...str);
}
