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
    iter(list[keys[i]]);
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
  _each(list, (val) => {
    newList.push(mapper(val));
  });
  return newList;
});
const { slice } = Array.prototype;
export function _rest(list, num) {
  return slice.call(list, num || 1);
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
