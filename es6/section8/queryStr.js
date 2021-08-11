import _ from './utility.js';

const getQueryStr = _.pipe(
  Object.entries,
  _.map(([k, v]) => `${k}=${v}`),
  _.join('&'),
);
const obj = { limit: 10, offset: 10, type: 'notice' };
const queryStr = getQueryStr(obj);
console.log(queryStr);
