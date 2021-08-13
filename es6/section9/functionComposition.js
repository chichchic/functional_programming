// 함수 합성 f . g === f(g(x))
const g = (a) => a + 1;
const f = (a) => a * a;
console.log(f(g(1)));
console.log(f(g())); // NaN이라는 이상한 값이 출력 된다.

// 모나드 : 함수 합성을 보다 안전하게 할 수 있도록 사용하는 방식
[4].map(g).map(f).forEach((r) => console.log(r));
[].map(g).map(f).forEach((r) => console.log(r)); // 아무런 값이 출력되지 않는다.

// 이와 유사하게 Promise는 특정 시점에 실행되는 함수를 안전하게 사용할 수 있도록 만들어준다.
Promise.resolve(4).then(g).then(f).then((r) => console.log(r));
