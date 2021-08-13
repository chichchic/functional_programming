promise와 callback 사용의 가장 큰 차이점은 반환값에 있다.
promise의 경우 반환값을 항상 promise 객체를 통해 일급함수로 관리하여 연속적으로 연산을 이어나갈 수 있도록 도와준다.

promise는 여러번 중첩되더라도 then으로 한번에 꺼내서 볼 수 있다.
Promise.resolve(Promise.resolve(1)).then(console.log) => 1이 바로 출력 됨