import { isNode } from 'a-js-tools';

export const platform = isNode() ? 'node' : ('browser' as const);
