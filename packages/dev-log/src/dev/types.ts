export type DevCallBack<T> = (it: DevTool) => T | Promise<T>;

/**
 *
 * 根测试
 *
 *
 */

export interface OriginDevTool {
  /**  本体方法  */
  <T = void>(message: string, callBack: DevCallBack<T>): T | Promise<T>;

  <T = void>(message: string, callback: () => T | Promise<T>): T | Promise<T>;
  // /**  跳过执行  */
  skip: DevTool;
  /**  每一步执行前  */
  beforeEach: (fn?: DevContextHookFn) => void;
  /**  每一步执行后  */
  afterEach: (fn?: DevContextHookFn) => void;
  /**  主测试的根名称  */
  name: string;
}

/**
 * 衍生测试
 */
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
  /**  根测试的名称  */
  name: string;
  /**  测试链  */
  description: string[];
};

/**
 *
 * 声明周期回调
 *
 */
export type DevContextHookFn = (it: DevTool) => void;

export type DevContentHookOptions<T> = T[];

export type InitDevOption = {
  /**  当前执行的层级  */
  level: number;
  /**  随机色  */
  randomColor: number[];
  /**  是否跳过  */
  skip: boolean;
  /**  执行前  */
  before: (DevContextHookFn | undefined)[];
  /**  执行后  */
  after: (DevContextHookFn | undefined)[];
  /**  根测试的名称  */
  name: string;
  /**  测试链  */
  description?: string[];
  /**  父级测试执行状态  */
  running: {
    id: symbol;
    running: boolean;
    description: string;
  };
};
