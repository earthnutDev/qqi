import { isNode } from 'a-js-tools';
import { runOtherCode } from 'a-node-tools';

/**
 *
 * 赋值文本到剪切板
 *
 * windows、mac 默认支持，而 linux 需要安装第三方的插件
 *
 *
 */
export async function copyTextToClipboard(str: string) {
  if (!isNode()) {
    throw new TypeError('该函数不支持当前环境');
  }
  let command = '';
  const currentOs = process.platform;

  if (currentOs === 'darwin') {
    command = `echo ${str} | pbcopy`;
  } else if (currentOs === 'win32') {
    command = `powershell -command "Set-Clipboard -Value '${str}'"`;
  } else {
    return '';
  }

  await runOtherCode(command);

  return str;
}
