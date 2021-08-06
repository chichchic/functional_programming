import products from './mock/products.js';
import _ from '../utility/_.js';
// 1. 모든 수량
const f1 = _.pipe(
  _.deepPluck('sizes.quantity'),
  (quantities) => _.reduce(quantities,
    (acc, quantitiy) => acc + quantitiy),
);
console.log(f1(products));

// 2. 선택 된 총 수량
const f2 = _.pipe(
  _.filter(({ is_selected }) => is_selected),
  f1,
);
console.log(f2(products));

// 3. 모든 가격
const f3 = _.pipe(
  (data) => _.reduce(data,
    (memo, { price, sizes }) => memo + _.reduce(sizes,
      (acc, size) => acc + (size.price + price) * size.quantity, 0),
    0),
);
console.log(f3(products));
// 4. 선택 된 총 가격
const f4 = _.pipe(
  _.filter(({ is_selected }) => is_selected),
  f3,
);
console.log(f4(products));
