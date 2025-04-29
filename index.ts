import { Dog } from './src/dog';
import { Dev } from './src/dev';

export { Dog, Dev };

export const dev = new Dev();

export default Dog;

export type { DevLogType, DevLog } from './src/dog/type';
