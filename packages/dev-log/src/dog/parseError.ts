import { pen } from 'color-pen';
import { DevLogType } from './type';

/**
 *
 * 解析 error
 *
 */
export function parseError(type: DevLogType) {
  try {
    throw new Error();
  } catch (error) {
    const parseErrorResult = ((error as Error).stack?.split('\n') || []).map(
      item => {
        const reg = /at\s(.*)\s\((.*):(\d*):(\d*)\)/;
        const res = reg.exec(item);
        if (res) {
          return {
            name: res[1],
            path: res[2],
            line: res[3],
            column: res[4],
          };
        }
        return {
          name: '',
        };
      },
    );

    const result = parseErrorResult.filter(
      e => e.name !== '' && e.path !== undefined,
    );

    const res = result[3] ?? result[2] ?? result[1] ?? result[0];

    const startStr = ` ${type === 'info' ? '💡' : type === 'error' ? '❌' : '⚠️ '} ${new Date().toLocaleString()} `;

    const printStartPenStr = (
      type === 'info'
        ? pen.bgCyan.brightWhite
        : type === 'error'
          ? pen.bgBlack.red
          : pen.bgBrightYellow.brightGreen
    )(startStr);

    console.log(
      `${printStartPenStr} ${res?.name ?? ''}  ${res?.line?.concat(' 行')} ${res?.column?.concat(' 列')}`,
    );
  }
}
