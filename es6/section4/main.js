import products from './mock/products.js';
import _ from './utility/index.js';

const add = (a, b) => a + b;
const getCheapProductsTotalPrice = _.reduce(
  add,
  _.map(
    ({ price }) => price,
    _.filter(
      ({ price }) => price < 20000,
      products,
    ),
  ),
);
console.log(getCheapProductsTotalPrice);
