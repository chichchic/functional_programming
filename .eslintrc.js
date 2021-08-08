module.exports = {
  root: true,
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
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-restricted-syntax': 0,
  },
};
