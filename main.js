import { _filter, _map, _go } from './_.js';

const userInfo = [
  { age: 26, name: 'park' },
  { age: 22, name: 'baek' },
  { age: 44, name: 'kim' },
  { age: 28, name: 'song' },
  { age: 36, name: 'gak' },
  { age: 41, name: 'wi' },
  { age: 32, name: 'je' },
  { age: 33, name: 'bong' },
  { age: 39, name: 'woo' },
];

const result1 = _go(userInfo,
  (users) => _filter(users, (user) => user.age >= 30),
  (users) => _map(users, (user) => user.name));
console.log(result1);
const result2 = _go(userInfo,
  _filter((user) => user.age >= 30),
  _map((user) => user.name));
console.log(result2);
