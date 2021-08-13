const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const getUserById = (id) => users.find((user) => user.id === id) || Promise.reject('can not find user');
const identity = (v) => v;
const f = ({ name }) => name;
const g = getUserById;

const fg = (id) => Promise.resolve(id).then(g).then(f).catch(identity)
  .then(console.log);
fg(2);
fg(4);
