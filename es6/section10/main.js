import _ from './utility.js';

const double = (v) => v * 2;
const add = (a, b) => a + b;

_.go(
  [Promise.reject(1), 2, 3],
  _.lazyFilter((v) => v % 2 === 1),
  _.take(4),
  console.log,
).catch((e) => console.error(e));

_.go(
  [Promise.resolve(1), 2, 3],
  _.filter((v) => v % 2 === 1),
  console.log,
).catch((e) => console.error(e));

_.go(
  [Promise.resolve(1), 2, 3],
  _.map(double),
  console.log,
).catch((e) => console.error(e));

_.go(
  [1, 2, 3, 4, Promise.resolve(5)],
  _.lazyFilter((v) => v % 2 === 1),
  _.takeAll,
  _.reduce(add),
  console.log,
).catch((e) => console.error(e));

_.go(
  [1, 2, 3, 4, Promise.reject('err')],
  _.lazyFilter((v) => v % 2 === 1),
  _.takeAll,
  _.reduce(add),
  console.log,
).catch((e) => console.error(e));
