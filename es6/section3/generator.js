function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function* getInfinity(i = 0) {
  while (true) yield i++;
}

function* setLimit(limit, iter) {
  for (const val of iter) {
    yield val;
    if (val >= limit) return;
  }
}

function* odds(limit) {
  for (const val of setLimit(limit, getInfinity(1))) {
    if (val % 2 === 1) yield val;
  }
}
const oddMaker = odds(10);
console.log(...oddMaker);
