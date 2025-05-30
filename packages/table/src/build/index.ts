import { isNode } from 'a-js-tools';
import { colorText } from 'color-pen';
import { QQITableEle } from '../types';
import { buildBody } from './buildBody';
import { buildHeader } from './buildHeader';
import { computerMaxLen } from './computerMaxLen';

/**  渲染  */
export function render(table: QQITableEle) {
  /**  获取每一行最大宽度的元素的宽度组成的数组  */
  const lineLen = computerMaxLen(table);
  /**  是否有表头  */
  let hasHeader = false;
  let buildStr: string = '';
  // 构建表头
  if (table.header) {
    hasHeader = true;
    buildStr += buildHeader(table.header, lineLen);
  }

  buildStr += buildBody(table.body, lineLen, hasHeader);

  const resultArr = colorText(buildStr);
  if (isNode()) {
    console.log(buildStr);
  } else {
    console.log(
      ...resultArr.map((e, i) => {
        if (i > 0) {
          const newStr =
            e +
            "font-family:'Fira Code',Consolas,Monaco,Courier,'等宽字体',monospace; font-size:12px;word-spacing:normal;padding:0;margin:0;";
          return newStr;
        }
        return e;
      }),
    );
  }
}
