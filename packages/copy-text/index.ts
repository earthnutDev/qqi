import { isNode } from 'a-js-tools';
import { execSync } from 'node:child_process';

/**
 *
 * 赋值文本到剪切板
 *
 * windows、mac 默认支持，而 linux 需要安装第三方的插件
 *
 *
 */
export function copyTextToClipboard(str: string) {
  if (!isNode()) {
    throw new TypeError('该函数不支持当前环境');
  }
  const currentOs = process.platform;

  const input = str.replace(/\s+$/, '');

  if (currentOs === 'darwin') {
    execSync('pbcopy', { input });
    return str;
  } else if (currentOs === 'win32') {
    const base64 = Buffer.from(input).toString('base64');
    execSync(`powershell -sta -noni -NoProfile -EncodedCommand ${base64}`, {
      stdio: 'ignore',
    });
    return str;
  } else {
    return '';
  }
}
