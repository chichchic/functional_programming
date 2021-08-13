import _ from './utility.js';

const add = (a, b) => a + b;
const oddFilter = (val) => val % 2 === 1;
const delay500 = (val) => new Promise((resolve) => setTimeout(() => {
  resolve(val);
}, 500));

console.time('a');
_.go(
  [1, 2, 3, 4, 5],
  _.lazyMap((a) => delay500(a * a)),
  _.reduce(add),
  console.log,
).then(() => console.timeEnd('a'));

console.time('b');
_.go(
  [1, 2, 3, 4, 5],
  _.lazyMap((a) => delay500(a * a)),
  _.concurrencyReduce(add),
  console.log,
).then(() => console.timeEnd('b'));

console.time('c');
_.go(
  [1, 2, 3, 4, 5],
  _.lazyMap((a) => delay500(a * a)),
  _.filter(oddFilter),
  _.concurrencyTake(2),
  console.log,
).then(() => console.timeEnd('c'));
