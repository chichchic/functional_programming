import _ from './utility.js';

const add = (a, b) => a + b;

const range = function (length) {
  let i = 0;
  const res = [];
  while (i < length) {
    res.push(i++);
  }
  return res;
};

// generate를 사용한 함수의 경우 도중에 멈춘다면 모든 평가를 진행하지 않을 수 있어 위 함수보다 효율적이다.
const lazyRange = function* (length) {
  let i = 0;
  while (i < length) {
    yield i++;
  }
};

const test = (name, time, func) => {
  console.time(name);
  while (time--) func();
  console.timeEnd(name);
};

test(_.reduce(add, range(1000000)));
test(_.reduce(add, lazyRange(1000000)));

// iterator를 사용할 경우 take와 같은 결과를 꺼내는 함수를 사용해주어야함
const take = _.curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) { break; }
  }
  return res;
});

_.go(
  lazyRange(50000000),
  take(5),
  console.log,
);

const lazyMap = _.curry(function* (func, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const v = cur.value;
    yield func(v);
  }
});

const lazyFilter = _.curry(function* (func, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const v = cur.value;
    if (func(v)) yield v;
  }
});

const result = _.go(
  lazyRange(50000000),
  lazyMap((a) => a * 3),
  lazyFilter((a) => a % 5 === 0),
  take(20),
);

console.log(...result);

// lazyMap, lazyFilter 계열의 함수의 경우 보조 함수가 순수함수일 경우 계산 순서를 바꾸더라도 동일한 결과가 나오는 결합법칙을 가지고 있다.

_.go(
  [1, 2, 3, 4],
  _.filter((a) => a % 2 === 0),
  _.map((a) => a * 2),
  _.reduce(add),
  console.log,
);
