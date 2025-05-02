import { dev } from '../packages/dev-log/index';
import { _p } from 'a-node-tools';
import { pen } from 'color-pen';
import Dog from 'index';

_p(pen('测试由我开始'));

const dog = new Dog({ type: 'all', name: 'dev log' });

const cat = new Dog();

dev.skip('测试 dog', () => {
  cat('cat info');
  dog('----***----');
  dog(cat.type);
  dog('----***----');
});

dev('测试 dog info', it => {
  it('测试子的 it ', () => {
    console.log('****');

    console.log(1211354);

    dog('dog info');

    dog(dog.prototype);
    console.log('****');
  });

  it('子项一', () => {
    console.log('我要出错');
    throw new Error('我粗错了');
    console.log('完啦，我打印不出来了');
  });

  it('子项二', () => {
    console.log('没事');
  });

  dog(Dog.prototype);

  dog.error('dog error');

  dog.warn('i am warn');

  dog(dog.type);

  dog.type = false;

  console.log(dog.type);

  dog.error('dog error');
});

dev('测试异步的代码', async it => {
  it('测试异代码 2️⃣ ', async () => {
    console.log('异步代码 2️⃣ 外部');
    return new Promise(resolve => {
      console.log('异步代码 2️⃣ 内部');
      setTimeout(() => {
        console.log('异步代码 2️⃣');
        resolve('异步代码 2️⃣');
      }, 500);
    });
  });

  await it<string>('测试异代码 1️⃣ ', async () => {
    console.log('异步代码 1️⃣ 外部');
    return new Promise(resolve => {
      console.log('异步代码 1️⃣ 内部');
      setTimeout(() => {
        console.log('异步代码 1️⃣');

        resolve('异步代码 1️⃣');
      }, 1000);
    });
  });
});
