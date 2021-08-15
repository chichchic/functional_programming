import _ from './utility.js';

/*
  함수형 map을 사용할 경우 take를 통해 내부 값들을 꺼내온 후 배열에 저장해 반환해주는것에 반해,
  Array.prototype.map의 경우 배열에 promise를 담아서 반환해주는 차이가 존재한다.
*/
async function delayI(a) {
  return new Promise((resolve) => setTimeout(() => {
    resolve(a);
  }, 100));
}

async function f2() {
  const list = [1, 2, 3, 4];
  const temp = list.map(async (a) => await delayI(a * a));
  console.log('f2', temp);
  const res = await temp;
  console.log('f2', res);
}

async function f3() {
  const list = [1, 2, 3, 4];
  const temp = _.map(async (a) => await delayI(a * a), list);
  console.log('f3', temp);
  const res = await temp;
  console.log('f3', res);
}

f2();
f3();
