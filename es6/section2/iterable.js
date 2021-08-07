const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());// { value: 1, done: false }
console.log(iterator.next());// { value: 2, done: false }
console.log(iterator.next());// { value: 3, done: false }
console.log(iterator.next());// { value: undefined, done: true }

const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
const mapKeys = map.keys();
console.log(mapKeys);
console.log(mapKeys.next());
console.log(mapKeys === mapKeys[Symbol.iterator]()); // 자기 자신을 동일하게 반환하도록 되어있다.

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { value: undefined, done: true } : { value: i--, done: false };
      },
      // 자기 자신을 반환하도록 만들어 둔 iterable 객체를 well formed iterator라고한다.
      [Symbol.iterator]() { return this; },
    };
  },
};

for (const value of iterable) {
  console.log(value);
}
