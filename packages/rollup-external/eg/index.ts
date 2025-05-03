import { external } from '../index';

external({
  ignore: ['node:fs'],
  include: ['node:'],
})('node:f');
