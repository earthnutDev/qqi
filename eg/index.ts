import { _p } from 'a-node-tools';
import { pen } from 'color-pen';
import Dog from 'index';

_p(pen('测试有我开始'));

const dog = new Dog({ type: 'all', name: 'dev log' });

const cat = new Dog();

cat('cat info');
dog('----***----');
dog(cat.type);
dog('----***----');

dog('dog info');

dog(dog.prototype);

dog(Dog.prototype);

dog.error('dog error');

dog.warn('i am warn');

dog(dog.type);

dog.type = false;

console.log(dog.type);

dog.error('dog error');
