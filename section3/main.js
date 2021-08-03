import {
  _keys, _get, _reject, _go,
  _map, _values, _pluck, _pairs,
  _filter, _compact, _find, _findIndex, _some, _every,
  _reduce, _min, _max, _minBy, _maxBy,
  _groupBy, _countBy,
} from '../utility/_.js';
import userInfo from '../fixed/userInfo.js';

// 수집하기
// 1.map
console.log(_map(userInfo, (user) => user.id));
// 2.values : 동일한 값들을 꺼내는 함수
console.log(userInfo[0]);
console.log(_keys(userInfo[0]));
console.log(_values(userInfo[0]));
// 3.pluck : obj로 이루어진 배열에서 특정 key값들로만 이루어진 배열을 추출
console.log(_pluck(userInfo, 'age'));
// 4.pars
console.log(_pairs(userInfo[0]));

// 거르기
// 1.filter
console.log(_filter(userInfo, (user) => user.age > 30));
// 2.reject
console.log(_reject(userInfo, (user) => user.age > 30));
// 3.compact: truthy한 값들만 남겨주는 함수
console.log(_compact([0, 1, -1, [], '', 'milk', '{}', true, false]));

// 찾아내기
// 1. find
console.log(_find(userInfo, (user) => user.id === 2));
// 2. findIndex
console.log(_findIndex(userInfo, (user) => user.id === 2));
// 3. some
console.log(_some([1, 2, 5, 10, 20], (val) => val > 10));
console.log(_some([1, 2, 5, 10, 20], (val) => val > 30));
// 4. every
console.log(_every([1, 2, 5, 10, 20], (val) => val > 0));
console.log(_every([1, 2, 5, 10, 20], (val) => val < 0));

// 접기
// 1. reduce
console.log(_reduce([1, 2, 5, 10, 20], (acc, cur) => acc + cur));
// 2. min, max, minBy, maxBy
console.log(_min([1, 2, 5, 10, -20]));
console.log(_max([1, 2, 5, 10, 20]));
console.log(_minBy(userInfo, _get('age')));
console.log(_maxBy(userInfo, _get('age')));
// 3. groupBy, push
_go(userInfo,
  _groupBy((val) => val.age - (val.age % 10)),
  console.log);
// 4. countBy, increase
_go(userInfo,
  _countBy((val) => val.age - (val.age % 10)),
  console.log);

// 실무 예시
_go(userInfo,
  _countBy((val) => val.age - (val.age % 10)),
  _map((count, key) => `${key}대는 ${count}명 입니다.`),
  console.log);
