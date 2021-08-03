import { _filter, _map, _go } from '../utility/_.js';

import userInfo from '../fixed/userInfo.js';

const result1 = _go(userInfo,
  (users) => _filter(users, (user) => user.age >= 30),
  (users) => _map(users, (user) => user.name));
console.log(result1);
const result2 = _go(userInfo,
  _filter((user) => user.age >= 30),
  _map((user) => user.name));
console.log(result2);
