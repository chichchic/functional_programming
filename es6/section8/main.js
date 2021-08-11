import _ from './utility.js';
import users from './mock/users.js';

console.log(_.go([[1, 2], [3, 4], [5, 6], [7, 8]], _.lazyFlatten, _.takeAll));
console.log(..._.lazyFlatMap(((a) => a * a), [[1, 2], [3, 4], [5, 6], [7, 8]]));

_.go(
  users,
  _.lazyMap(({ family }) => family),
  _.lazyFlatten,
  _.lazyFilter(({ age }) => age > 20),
  _.take(4),
  _.lazyMap(({ age }) => age),
  _.reduce((a, b) => a + b),
  console.log,
);
