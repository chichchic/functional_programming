import _ from './utility.js';

_.go(
  Promise.resolve(1),
  (a) => a + 1,
  (a) => a * a,
  (v) => new Promise((resolve) => setTimeout(() => {
    resolve(v / 2);
  }, 10)),
  (a) => a * a,
  console.log,
).catch((e) => console.error(e));

const accAdd = _.reduce((a, b) => a + b);
accAdd([1, 2, 3, 4, 5, 6]).then(console.log);
