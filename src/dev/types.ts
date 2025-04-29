export type DevTool = {
  /**  本体方法  */
  <T = void>(
    message: string,
    callBack: (it: DevTool) => T | Promise<T>,
  ): T | Promise<T>;

  <T = void>(message: string, callback: () => T | Promise<T>): T | Promise<T>;
  /**  跳过执行  */
  skip: DevTool;
};

export type InitDevOption = {
  /**  是否跳过  */
  skip?: boolean;
};
