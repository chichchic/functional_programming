# es6에서의 순회
es6 내장객체인 Array, Map, Set은 이터러블/이터레이터 프로토콜을 따른다.
- 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
- 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 for...of, **전개 연산자** 등과 함께 동작하도록 한 규약

Map의 경우 map.keys(), map.values(), map.entries()등을 사용하면 iterator 객체를 반환 해준다.
querySelector 또한 iterable 프로토콜을 따른다.