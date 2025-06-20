import { QQI } from '../src/core';

const qqi = new QQI('test');

const a = qqi.read<{ a: number }>('test');
console.log('====================================');
console.log(a);
console.log('====================================');
if (a?.a) {
  a.a = 10;

  qqi.write('test', a);
}
