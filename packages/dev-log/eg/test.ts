import test from 'node:test';
import { dev } from '..';

dev.skip('测试 test 的 foreach 功能', () => {
  let a = 0;
  test('测试功能块 ', async it => {
    it.beforeEach(() => {
      a = 0;
      console.log('====================================');
      console.log('当前执行的名称为', it.name);
      console.log('====================================');
    });

    await it.test('测试块 1', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试块 1 - 0', ++a);
        setTimeout(() => {
          console.log('测试块 1 - 1', ++a);
          resolve(true);
          console.log('测试块 1 - 2', ++a);
        }, 100);
        console.log('测试块 1 - 3', ++a);
      });
    });

    await it.test('测试块 2', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试块 2 - 0', ++a);
        setTimeout(() => {
          console.log('测试块 2 - 1', ++a);
          resolve(true);
          console.log('测试块 2 - 2', ++a);
        }, 100);
        console.log('测试块 2 - 3', ++a);
      });
    });

    await it.test('测试块 3', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试块 3 - 0', ++a);
        setTimeout(() => {
          console.log('测试块 3 - 1', ++a);
          resolve(true);
          console.log('测试块 3 - 2', ++a);
        }, 100);
        console.log('测试块 3 - 3', ++a);
      });
    });
  });
});

dev('测试 dev 是否打印消息', () => {
  console.log('**********');
});

dev('测试 dev 的 foreach 功能', async it => {
  let a = 0;

  it.afterEach(it => {
    a = 0;
    console.log('====================================');
    // console.log(this, it);
    console.log('当前执行的名称为', it.name);
    console.log('当前执行的消息', it.description);
    console.log('====================================');
  });

  await it('测试块 1', async () => {
    a++;
    await new Promise(resolve => {
      console.log('测试块 1 - 0', ++a);
      setTimeout(() => {
        console.log('测试块 1 - 1', ++a);
        resolve(true);
        console.log('测试块 1 - 2', ++a);
      }, 100);
      console.log('测试块 1 - 3', ++a);
    });
  });

  await it('测试块 2', async () => {
    a++;
    await new Promise(resolve => {
      console.log('测试块 2 - 0', ++a);
      setTimeout(() => {
        console.log('测试块 2 - 1', ++a);
        resolve(true);
        console.log('测试块 2 - 2', ++a);
      }, 100);
      console.log('测试块 2 - 3', ++a);
    });
  });

  await it('测试块 3', async () => {
    a++;
    await new Promise(resolve => {
      console.log('测试块 3 - 0', ++a);
      setTimeout(() => {
        console.log('测试块 3 - 1', ++a);
        resolve(true);
        console.log('测试块 3 - 2', ++a);
      }, 100);
      console.log('测试块 3 - 3', ++a);
    });
  });
});

dev(
  '测试 dev 的 foreach 功能，但是每一个异步 it 块都不使用 await',
  async it => {
    let a = 0;

    it.afterEach(() => {
      a = 0;
    });

    await it('测试块 1', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试无等待块 1 - 0', ++a);
        setTimeout(() => {
          console.log('测试无等待块 1 - 1', ++a);
          resolve(true);
          console.log('测试无等待块 1 - 2', ++a);
        }, 100);
        console.log('测试无等待块 1 - 3', ++a);
      });
    });

    await it('测试块 2', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试无等待块 2 - 0', ++a);
        setTimeout(() => {
          console.log('测试无等待块 2 - 1', ++a);
          resolve(true);
          console.log('测试无等待块 2 - 2', ++a);
        }, 100);
        console.log('测试无等待块 2 - 3', ++a);
      });
    });

    await it('测试块 3', async () => {
      a++;
      await new Promise(resolve => {
        console.log('测试无等待块 3 - 0', ++a);
        setTimeout(() => {
          console.log('测试无等待块 3 - 1', ++a);
          resolve(true);
          console.log('测试无等待块 3 - 2', ++a);
        }, 100);
        console.log('测试无等待块 3 - 3', ++a);
      });
    });
  },
);
dev('非异步测试', it => {
  it('测试 1', () => {});
  it('测试 2', () => {});
  it('测试 3', () => {});
});
