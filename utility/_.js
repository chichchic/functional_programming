export function _isObject(obj) {
  return typeof obj === 'object' && !!obj;
}
export function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (c) {
        return fn(a, c);
      };
  };
}
export function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (c) {
        return fn(c, a);
      };
  };
}
export const _get = _curryr((obj, key) => (obj == null ? undefined : obj[key]));
export const _length = _get('length');
export function _keys(obj) {
  return _isObject(obj) ? Object.keys(obj) : [];
}
export function _each(list, iter) {
  const keys = _keys(list);
  for (let i = 0, len = _length(keys); i < len; ++i) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}
export const _filter = _curryr((list, predi) => {
  const newList = [];
  _each(list, (val) => {
    if (predi(val)) {
      newList.push(val);
    }
  });
  return newList;
});
export const _map = _curryr((list, mapper) => {
  const newList = [];
  _each(list, (val, key) => {
    newList.push(mapper(val, key));
  });
  return newList;
});
export const _pairs = _map((val, key) => [key, val]);
const { slice } = Array.prototype;
export function _rest(list, num = 1) {
  return slice.call(list, num);
}
export function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    [memo] = list;
    list = _rest(list);
  }
  _each(list, (val) => {
    memo = iter(memo, val);
  });
  return memo;
}
export function _pipe(...fns) {
  return function (arg) {
    return _reduce(fns, (acc, fn) => fn(acc), arg);
  };
}
export function _go(arg, ...fns) {
  return _pipe(...fns)(arg);
}

function _identity(val) {
  return val;
}
export const _values = _map(_identity);
export function _pluck(data, key) {
  return _map(data, _get(key));
}

export function _negate(func) {
  return function (val) {
    return !func(val);
  };
}

export const _reject = _curryr((data, predi) => _filter(data, _negate(predi)));

export const _compact = _filter(_identity);

export const _find = _curryr((data, predi) => {
  const keys = _keys(data);
  let val;
  for (let i = 0, len = _length(keys); i < len; ++i) {
    if (predi(data[keys[i]])) {
      val = data[keys[i]];
      break;
    }
  }
  return val;
});

export const _findIndex = _curryr((data, predi) => {
  const keys = _keys(data);
  for (let i = 0, len = _length(keys); i < len; ++i) {
    if (predi(data[keys[i]])) {
      return i;
    }
  }
  return -1;
});

export const _some = _curryr((data, predi = _identity) => _findIndex(data, predi) !== -1);

export const _every = _curryr((data, predi = _identity) => _findIndex(data, _negate(predi)) === -1);

export function _min(data) {
  return _reduce(data, (acc, cur) => (acc < cur ? acc : cur));
}

export function _max(data) {
  return _reduce(data, (acc, cur) => (acc > cur ? acc : cur));
}

export const _minBy = _curryr((data, iter) => _go(data, _map((val) => iter(val)), _min));
export const _maxBy = _curryr((data, iter) => _go(data, _map((val) => iter(val)), _max));

export function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}
export const _groupBy = _curryr(
  (data, iter) => _reduce(data,
    (group, val) => _push(group, iter(val), val),
    {}),
);
export const _increase = function (obj, key) {
  if (obj[key]) {
    ++obj[key];
  } else {
    obj[key] = 1;
  }
  return obj;
};
export const _countBy = _curryr(
  (data, iter) => _reduce(data,
    (count, val) => _increase(count, iter(val)),
    {}),
);
