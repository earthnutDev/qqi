export interface OriginDevTool {
  /**  本体方法  */
  <T = void>(
    message: string,
    callBack: (it: DevTool) => T | Promise<T>,
  ): T | Promise<T>;

  <T = void>(message: string, callback: () => T | Promise<T>): T | Promise<T>;
  // /**  跳过执行  */
  skip: DevTool;
  /**  每一步执行前  */
  beforeEach: (fn?: DevContextHookFn) => void;
  /**  每一步执行后  */
  afterEach: (fn?: DevContextHookFn) => void;
}

export type DevTool = {
  /**  本体方法  */
  <T = void>(
    message: string,
    callBack: (it: DevTool) => T | Promise<T>,
  ): T | Promise<T>;

  <T = void>(message: string, callback: () => T | Promise<T>): T | Promise<T>;
  // /**  跳过执行  */
  skip: DevTool;
  /**  执行前  */
  before: (fn?: DevContextHookFn) => void;
  /**  每一步执行前  */
  beforeEach: (fn?: DevContextHookFn) => void;
  /**  执行后  */
  after: (fn?: DevContextHookFn) => void;
  /**  每一步执行后  */
  afterEach: (fn?: DevContextHookFn) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DevContextHookFn = (...args: any[]) => void;

export type DevContentHookOptions<T> = T[];

export type InitDevOption = {
  /**  是否跳过  */
  skip: boolean;
  /**  执行前  */
  before: (DevContextHookFn | undefined)[];
  /**  执行后  */
  after: (DevContextHookFn | undefined)[];
};
