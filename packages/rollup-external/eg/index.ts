import { external } from '../index';

external({
  exclude: ['node:', 'a-node-tools'],
  ignore: ['node:'],
})('node:fs');
