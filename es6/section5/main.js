import products from './mock/products.js';
import _ from './utility.js';

const getTotalPrice = _.pipe(
  _.map(({ price }) => price),
  _.reduce((acc, cur) => acc + cur),
);

const getBasedTotalPrice = (predi) => _.pipe(
  _.filter(predi),
  getTotalPrice,
);

const getCheapProductsTotalPrice = _.pipe(
  getBasedTotalPrice(({ price }) => price < 20000),
);

console.log(getCheapProductsTotalPrice(products));
