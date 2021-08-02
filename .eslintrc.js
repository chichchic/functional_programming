module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
  },
};
