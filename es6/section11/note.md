async await의 기반은 결국 Promise다.
async 함수값의 리턴값은 무조건 Promise 객체이다.

async await의 경우 함수 체인(Promise.then)으로 다루는데 어려움이 있어 문장형으로 다루기 위해 사용한다.
파이프라인의 경우 함수를 합성하기 위해 사용한다.