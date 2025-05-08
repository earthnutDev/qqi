import Dog, { dev } from '..';

// dev.beforeEach(() => {
//   console.log('我是大哥，你们执行前先执行我');
// });
// dev.beforeEach(() => {
//   console.log('我是二哥，你们执行前先执行我');
// });

// dev.afterEach(() => {
//   console.log('我是二弟，你们执行完再执行我');
// });
// dev.afterEach(() => {
//   console.log('我是大弟，你们执行完再执行我');
// });

const dog = new Dog({ type: 'all', name: 'dev log' });

const cat = new Dog();

dev.skip('测试 dog', it => {
  cat('cat info');
  dog('----***----');
  dog(cat.type);
  dog('----***----');

  it('被跳过执行的 1', () => {
    console.log(1);
  });
  it('被跳过执行的 2', () => {
    console.log(2);
  });
});

dev.skip('测试 dog info', it => {
  it.before(() => {
    console.log('before 仅执行一次才对的');
  });

  it.after(() => {
    console.log('after 仅执行一次才对的');
  });

  it.beforeEach(() => {
    console.log('before each');
  });

  it.afterEach(() => {
    console.log('after each');
  });

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

dev.skip('测试异步的代码', async it => {
  it.after(() => {
    console.log('after async 仅执行一次才对的');
  });

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
