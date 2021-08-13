const curry = (f) => (a, ...args) => (args.length
  ? f(a, ...args)
  : (...childArgs) => f(a, ...childArgs));

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
// reduce 계열 함수들로 계산한 결과는 모두 promise 객체로 값을 반환하도록 되어있다.
const reduce = curry((f, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  return go1(acc, function recur(recurAcc) {
    let cur = iter.next();
    while (!cur.done) {
      const v = cur.value;
      recurAcc = f(recurAcc, v);
      if (recurAcc instanceof Promise) {
        return recurAcc.then(recur);
      }
      cur = iter.next();
    }
    return Promise.resolve(recurAcc);
  });
});

const go = (...args) => reduce((arg, f) => f(arg), args);
const pipe = (func, ...funcs) => (...args) => go(func(...args), ...funcs);

export default {
  curry, reduce, go, pipe,
};
