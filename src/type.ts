export type DevLogType = boolean | 'info' | 'error' | 'all' | 'warn';

export type DevLog = {
  /**  打印信息本当作为 info 信息，在 type 为 `false`、`error`、`warn` 时不打印   */
  (...str: unknown[]): void;
  /**  当打印的版本为错误信息，在 type 为 `false`、`info`、`warn` 时不打印  */
  error: (...str: unknown[]) => void;
  /**  当打印的版本为警示信息，在 type 为 `false`、`info`、`error` 时不打印  */
  warn: (...str: unknown[]) => void;
  /**  node 平台执行依据  */
  name: '';
  /**  开启打印的类型  */
  type: DevLogType;
  /**  清除控制台  */
  clear: () => void;
};

export type platform = 'node' | 'browser';

export interface PrivateFunc {
  error: (...str: unknown[]) => void;
  warn: (...str: unknown[]) => void;
  info: (...str: unknown[]) => void;
}
