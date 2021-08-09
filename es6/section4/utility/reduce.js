const reduce = (f, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const v of iter) {
    acc = f(acc, v);
  }
  return acc;
};

export default reduce;
