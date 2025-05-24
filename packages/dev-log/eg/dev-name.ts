import { dev } from '..';
import { DevTool } from '../src/dev/types';

const _p = (it: DevTool) => {
  console.log('name: ', it.name);
  console.log('description: ', it.description);
};

dev('测试 name ', async it => {
  it.before(it => {
    console.log('带 it 的 before');

    _p(it);
  });
  it.before(() => {
    console.log('不带 it 的 before');

    _p(it);
  });
  it.after(it => {
    console.log('带 it 的 after');

    _p(it);
  });

  it.after(() => {
    console.log('不带 it 的 after');

    _p(it);
  });
  it.beforeEach(it => {
    console.log('带 it 的 beforeEach');

    _p(it);
  });
  it.beforeEach(() => {
    console.log('不带 it 的 beforeEach');

    _p(it);
  });
  it.afterEach(it => {
    console.log('带 it 的 afterEach');

    _p(it);
  });

  it.afterEach(() => {
    console.log('不带 it 的 afterEach');

    _p(it);
  });

  _p(it);

  await it('测试有 it 的', it => {
    console.log('******----****');
    _p(it);
  });

  it('测试没有 it 的', () => {
    console.log('******----****');
    _p(it);
    it.before(it => {
      console.log('带 it 的 before');
      _p(it);
    });
    it.before(() => {
      console.log('不带 it 的 before');

      _p(it);
    });
    it.after(it => {
      console.log('带 it 的 after');

      _p(it);
    });

    it.after(() => {
      console.log('不带 it 的 after');

      _p(it);
    });
    it.beforeEach(it => {
      console.log('带 it 的 beforeEach');

      _p(it);
    });
    it.beforeEach(() => {
      console.log('不带 it 的 beforeEach');

      _p(it);
    });
    it.afterEach(it => {
      console.log('带 it 的 afterEach');

      _p(it);
    });

    it.afterEach(() => {
      console.log('不带 it 的 afterEach');

      _p(it);
    });
  });
});
