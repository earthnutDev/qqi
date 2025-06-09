import { Dog } from './src/dog';
import { Dev } from './src/dev';

export { Dog, Dev };

const name = '@qqi/dev-log';
// 与 Dog 不同， Dev 需要返回一个构建好的示例
// 而 Dog 的示例每一次都因初始化参数不同而不同
// 而 Dev 需要直接构建一个顶级示例，做到拿来就用
/**
 *
 * 测试
 *
 */
export const dev = new Dev({
  level: 0,
  randomColor: [],
  skip: false,
  before: [],
  after: [],
  name,
  running: {
    description: name,
    running: true,
    id: Symbol(name),
  },
  executionStack: [],
});

export type { DevLogType, DevLog } from './src/dog/type';
