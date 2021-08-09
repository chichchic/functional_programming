const curry = (f) => (a, ...args) => (args.length
  ? f(a, ...args)
  : (...childArgs) => f(a, ...childArgs));
const filter = curry((f, iter) => {
  const res = [];
  for (const v of iter) {
    if (f(v)) res.push(v);
  }
  return res;
});

const map = curry((f, iter) => {
  const res = [];
  for (const v of iter) {
    res.push(f(v));
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const v of iter) {
    acc = f(acc, v);
  }
  return acc;
});

const go = (...args) => reduce((arg, f) => f(arg), args);
const pipe = (func, ...funcs) => (...args) => go(func(...args), ...funcs);

export default {
  curry, filter, map, reduce, go, pipe,
};
