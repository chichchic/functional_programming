import products from './mock/products.js';
import _ from './utility.js';

const add = (a, b) => a + b;

const sum = _.curry((func, iter) => _.go(
  iter,
  _.map(func),
  _.reduce(add),
));

const totalQuantity = _.pipe(
  sum(({ quantity }) => quantity),
);

console.log(totalQuantity(products));

const totalPrice = _.pipe(
  sum(({ price, quantity }) => price * quantity),
);

console.log(totalPrice(products));

document.querySelector('#cart').innerHTML = `
  <table>
    <tr>
      <th>선택</th>
      <th>상품 이름</th>
      <th>가격</th>
      <th>수량</th>
      <th>총액</th>
    </tr>
    ${sum((product) => `
    <tr>
      <td><input type="checkbox" ${product.isSelected ? 'checked' : ''}/></td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td><input value="${product.quantity}"/></td>
      <td>${product.quantity * product.price}</td>
    </tr>
    `, products)}
    <tr>
      <td colspan="3">합계</td>
      <td>${totalQuantity(_.filter(({ isSelected }) => isSelected, products))}</td>
      <td>${totalPrice(_.filter(({ isSelected }) => isSelected, products))}</td>
    </tr>
  </table>
`;
