const map = (f, iter) => {
  const res = [];
  for (const v of iter) {
    res.push(f(v));
  }
  return res;
};

export default map;
