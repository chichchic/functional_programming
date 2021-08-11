const curry = (f) => (a, ...args) => (args.length
  ? f(a, ...args)
  : (...childArgs) => f(a, ...childArgs));

const lazyEntries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const take = curry((l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) { break; }
  }
  return res;
});

const takeAll = take(Infinity);

const lazyFilter = curry(function* (func, iter) {
  for (const v of iter) {
    if (func(v)) yield v;
  }
});

const lazyMap = curry(function* (func, iter) {
  for (const v of iter) {
    yield func(v);
  }
});

// null값이 올 경우를 대비해서 방어적으로 코딩
const isIterable = (a) => a && a[Symbol.iterator];
const lazyFlatten = function* (iter) {
  for (const v of iter) {
    if (isIterable(v)) {
      yield* v;
    } else {
      yield v;
    }
  }
};

function* lazyDeepFlatten(iter) {
  for (const v of iter) {
    if (isIterable(v)) {
      yield* lazyDeepFlatten(v);
    } else {
      yield v;
    }
  }
}

const reduce = curry((f, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur = iter.next();
  while (!cur.done) {
    const v = cur.value;
    acc = f(acc, v);
    cur = iter.next();
  }
  return acc;
});

const join = curry((sep = ',', iter) => reduce((acc, cur) => `${acc}${sep}${cur}`, iter));

const go = (...args) => reduce((arg, f) => f(arg), args);
const pipe = (func, ...funcs) => (...args) => go(func(...args), ...funcs);

const filter = curry(pipe(lazyFilter, takeAll));
const map = curry(pipe(lazyMap, takeAll));
const flatten = pipe(lazyFlatten, takeAll);

const find = (f, iter) => go(
  iter,
  lazyFilter(f),
  take(1),
  ([a]) => a,
);

const lazyFlatMap = curry(pipe(lazyMap, flatten));
export default {
  curry,
  lazyEntries,
  take,
  takeAll,
  lazyFilter,
  lazyMap,
  lazyFlatten,
  lazyDeepFlatten,
  reduce,
  join,
  go,
  pipe,
  filter,
  map,
  flatten,
  find,
  lazyFlatMap,
};
