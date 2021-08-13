const nop = Symbol('nop');
const curry = (f) => (a, ...args) => (args.length
  ? f(a, ...args)
  : (...childArgs) => f(a, ...childArgs));

const identity = (v) => v;

const lazyEntries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const take = curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const v = cur.value;
      if (v instanceof Promise) {
        return v.then((val) => {
          res.push(val);
          return res.length === l ? res : recur();
        }, (e) => (e === nop ? recur() : Promise.reject(e)));
      }
      res.push(v);
      if (res.length === l) return res;
      /* NOTE:
      for...of 문에서 생성된 task가 모두 종료 된 후 Promise.thend이 실행되어
      원하는 순서에 맞춰 배열에 넣어줄 수 없게된다. 따라서 재귀를 사용하여 원하는 순서에 맞춰 실행될 수 있도록 만들어야 한다.
    */
      // Promise.resolve(v).then((val) => res.push(val));
    }
    return res;
  }());
});

const takeAll = take(Infinity);

const lazyFilter = curry(function* (func, iter) {
  for (const v of iter) {
    const predi = go1(v, func);
    if (predi instanceof Promise) yield predi.then((val) => (val ? v : Promise.reject(nop)));
    else if (predi) yield v;
  }
});

const lazyMap = curry(function* (func, iter) {
  for (const v of iter) {
    yield go1(v, func);
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

const reduceF = (acc, val, f) => (val instanceof Promise
  ? val.then((res) => f(acc, res), (e) => (e === nop ? acc : Promise.reject(e)))
  : f(acc, val));

const head = (iter) => go1(take(1, iter), ([h]) => h);

// reduce 계열 함수들로 계산한 결과는 모두 promise 객체로 값을 반환하도록 되어있다.
const reduce = curry((f, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    return reduce(f, head(iter), iter);
  }
  iter = iter[Symbol.iterator]();

  return go1(acc, function recur(recurAcc) {
    let cur = iter.next();
    while (!cur.done) {
      recurAcc = reduceF(recurAcc, cur.value, f);
      if (recurAcc instanceof Promise) {
        return recurAcc.then(recur);
      }
      cur = iter.next();
    }
    return Promise.resolve(recurAcc);
  });
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

function noop() { }
const catchNoop = ([...arr]) => {
  arr.forEach((a) => (a instanceof Promise
    ? a.catch(noop) : a));
  return arr;
};
const concurrencyReduce = curry((f, acc, iter) => (iter
  ? reduce(f, acc, catchNoop(iter))
  : reduce(f, catchNoop(acc))));
const concurrencyTake = curry((l, iter) => take(l, catchNoop(iter)));
const concurrencyTakeAll = concurrencyTake(Infinity);
const concurrencyMap = pipe(lazyMap, concurrencyTakeAll);
const concurrencyFilter = pipe(lazyFilter, concurrencyTakeAll);

export default {
  curry,
  identity,
  lazyEntries,
  take,
  takeAll,
  lazyFilter,
  lazyMap,
  lazyFlatten,
  lazyDeepFlatten,
  join,
  reduce,
  go,
  pipe,
  filter,
  map,
  flatten,
  find,
  lazyFlatMap,
  concurrencyReduce,
  concurrencyTake,
  concurrencyTakeAll,
  concurrencyMap,
  concurrencyFilter,
};
