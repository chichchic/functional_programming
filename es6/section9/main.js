const delay100 = (a) => new Promise((resolve) => setTimeout(() => {
  resolve(a);
}, 100));

const go = (a, f) => Promise.resolve(a).then(f);
const add5 = (a) => a + 5;
const result = go(delay100(5), add5);
result.then(console.log);
