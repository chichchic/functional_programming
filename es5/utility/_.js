function isObject(obj) {
  return typeof obj === 'object' && !!obj;
}
function unique(data) {
  return [...new Set(data)];
}

function extend(dest, src) {
  return { ...dest, ...src };
}

function curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (c) {
        return fn(a, c);
      };
  };
}
function curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (c) {
        return fn(c, a);
      };
  };
}
const get = curryr((obj, key) => (obj == null ? undefined : obj[key]));
const length = get('length');
function keys(obj) {
  return isObject(obj) ? Object.keys(obj) : [];
}
function each(list, iter) {
  const listKeys = keys(list);
  for (let i = 0, len = length(listKeys); i < len; ++i) {
    iter(list[listKeys[i]], listKeys[i]);
  }
  return list;
}
const filter = curryr((list, predi) => {
  const newList = [];
  each(list, (val) => {
    if (predi(val)) {
      newList.push(val);
    }
  });
  return newList;
});
const map = curryr((list, mapper) => {
  const newList = [];
  each(list, (val, key) => {
    newList.push(mapper(val, key));
  });
  return newList;
});
const pairs = map((val, key) => [key, val]);
const { slice } = Array.prototype;
function rest(list, num = 1) {
  return slice.call(list, num);
}
function reduce(list, iter, memo) {
  if (arguments.length === 2) {
    [memo] = list;
    list = rest(list);
  }
  each(list, (val) => {
    memo = iter(memo, val);
  });
  return memo;
}
function flatten(arr, depth = Infinity) {
  return depth > 0
    ? reduce(
      arr,
      (memo, val) => memo.concat(Array.isArray(val) ? flatten(val, depth - 1) : val),
      [],
    )
    : [...arr];
}
function indexBy(data, attr) {
  return reduce(data, (memo, val) => {
    memo[val[attr]] = val;
    return memo;
  }, {});
}
function pipe(...fns) {
  return function (arg) {
    return reduce(fns, (acc, fn) => fn(acc), arg);
  };
}
function go(arg, ...fns) {
  return pipe(...fns)(arg);
}

function identity(val) {
  return val;
}
const values = map(identity);
const pluck = curryr((data, key) => map(data, get(key)));
const deepPluck = curryr((data, key) => {
  const pluckKeys = key.split('.');
  return reduce(pluckKeys, (memo, pluckKey) => go(memo,
    map(get(pluckKey)), flatten), data);
});
function negate(func) {
  return function (val) {
    return !func(val);
  };
}

const reject = curryr((data, predi) => filter(data, negate(predi)));

const compact = filter(identity);

const find = curryr((data, predi) => {
  const dataKeys = keys(data);
  let val;
  for (let i = 0, len = length(dataKeys); i < len; ++i) {
    if (predi(data[dataKeys[i]])) {
      val = data[dataKeys[i]];
      break;
    }
  }
  return val;
});

const findIndex = curryr((data, predi) => {
  const dataKeys = keys(data);
  for (let i = 0, len = length(dataKeys); i < len; ++i) {
    if (predi(data[dataKeys[i]])) {
      return i;
    }
  }
  return -1;
});

const some = curryr((data, predi = identity) => findIndex(data, predi) !== -1);

const every = curryr((data, predi = identity) => findIndex(data, negate(predi)) === -1);

function min(data) {
  return reduce(data, (acc, cur) => (acc < cur ? acc : cur));
}

function max(data) {
  return reduce(data, (acc, cur) => (acc > cur ? acc : cur));
}

const minBy = curryr((data, iter) => go(data, map((val) => iter(val)), min));
const maxBy = curryr((data, iter) => go(data, map((val) => iter(val)), max));

function push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}
const groupBy = curryr(
  (data, iter) => reduce(data,
    (group, val) => push(group, iter(val), val),
    {}),
);
const increase = function (obj, key) {
  if (obj[key]) {
    ++obj[key];
  } else {
    obj[key] = 1;
  }
  return obj;
};
const countBy = curryr(
  (data, iter) => reduce(data,
    (count, val) => increase(count, iter(val)),
    {}),
);
const where = curryr((data, obj) => {
  const objKeys = keys(obj);
  return reduce(objKeys, (memo, key) => filter(memo, (val) => val[key] === obj[key]), data);
});

function contains(data, comparison) {
  return some(data, (val) => val === comparison);
}

export default {
  isObject,
  unique,
  extend,
  curry,
  curryr,
  get,
  length,
  keys,
  each,
  filter,
  map,
  pairs,
  rest,
  reduce,
  flatten,
  indexBy,
  pipe,
  go,
  identity,
  values,
  pluck,
  deepPluck,
  negate,
  reject,
  compact,
  find,
  findIndex,
  some,
  every,
  min,
  max,
  minBy,
  maxBy,
  push,
  groupBy,
  increase,
  countBy,
  where,
  contains,
};
