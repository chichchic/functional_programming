// NOTE: 요청이 계속 들어올 때 이전 요청 끝날때까지 기다렸다 다시 실행되는 함수 만드는 방법

const solution = (function () {
  const queue = []
  let queIdx = -1;
  return async function (callApi) {
    let result, token
    const curIdx = queIdx;
    queIdx++;
    if (curIdx === -1) {
      const res = await callApi()
      result = res.result
      token = res.token
    }
    const apiPromise = new Promise((resolve) => callApi().then(({ result, token }) => resolve(token)
    ))
    queue.push(apiPromise)
  }
})()