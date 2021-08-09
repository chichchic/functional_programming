const filter = (f, iter) => {
  const res = [];
  for (const v of iter) {
    if (f(v)) res.push(v);
  }
  return res;
};

export default filter;
