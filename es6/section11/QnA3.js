import _ from './utility.js';

async function delayI(v) {
  return new Promise((resolve) => setTimeout(() => {
    resolve(v);
  }, 100));
}

async function pipe1(list) {
  const r1 = await _.go(
    list,
    _.map((v) => delayI(v * v)),
    _.filter((a) => delayI(a % 2 === 0)),
    _.map((a) => delayI(a + 1)),
    _.concurrencyTakeAll,
    _.reduce((a, b) => a + b),
  );
  console.log(r1);
}

pipe1([1, 2, 3, 4]);
