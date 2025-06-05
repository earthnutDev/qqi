import { isUndefined } from 'a-type-of-js';
import { getVerifiedHomeDir } from './getVerifiedHomeDir';
import {
  fileExist,
  pathJoin,
  readFileToJsonSync,
  writeJsonFile,
} from 'a-node-tools';
import { dog } from './dog';
import { mkdirSync } from 'node:fs';
/**
 *
 * 嗯
 *
 */
export class QQI {
  #filename: string;

  /**
   *  构造函数
   *
   * @param fileName  文件名
   */
  constructor(fileName: string) {
    this.#filename = pathJoin(
      getVerifiedHomeDir(),
      '.earthnut.dev.data',
      `${fileName}`,
    );
  }

  /**  获取某文件的  */
  read<T extends Record<string, unknown> = Record<string, unknown>>(
    fileName: string,
  ): T | Record<string, never> {
    const _ = pathJoin(this.#filename, fileName);
    const __ = fileExist(_);

    if (isUndefined(__)) {
      return {};
    } else {
      return (readFileToJsonSync(_) as T) || {};
    }
  }
  /**  写入文件  */
  write(fileName: string, content: object) {
    const _ = pathJoin(this.#filename, fileName);
    const _dir = pathJoin(_, '../');
    dog('创建的文件路径为');
    mkdirSync(_dir, { recursive: true });
    dog('写入的文件路径为：', _);
    dog('写入文件内容为', content);
    const result = writeJsonFile(_, content);
    dog('写入反馈', result);
    return result;
  }
}
