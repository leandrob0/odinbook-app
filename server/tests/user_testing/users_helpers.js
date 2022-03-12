const initialUsers = [
  {
    email: 'leandro_bovino@yahoo.com',
    password: 'thisisagoodpassword',
    first_name: 'Matias',
    last_name: 'Bovino',
  },
  {
    email: 'leandro.bovino@gmail.com',
    password: 'thisisabadpassword',
    first_name: 'Leandro',
    last_name: 'Bovino',
  },
  {
    email: 'idontknow.idont@hotmail.com',
    password: 'idontknow',
    first_name: 'Random',
    last_name: 'Name',
  },
  {
    email: 'another.ano@hotmail.com',
    password: 'fourthaccount',
    first_name: 'Another',
    last_name: 'Random',
  },
];

const notMutatedUsers = [
  {
    email: 'leandro_bovino@yahoo.com',
    password: 'thisisagoodpassword',
    first_name: 'Matias',
    last_name: 'Bovino',
  },
  {
    email: 'leandro.bovino@gmail.com',
    password: 'thisisabadpassword',
    first_name: 'Leandro',
    last_name: 'Bovino',
  },
  {
    email: 'idontknow.idont@hotmail.com',
    password: 'idontknow',
    first_name: 'Random',
    last_name: 'Name',
  },
  {
    email: 'another.ano@hotmail.com',
    password: 'fourthaccount',
    first_name: 'Another',
    last_name: 'Random',
  },
];

module.exports = { initialUsers, notMutatedUsers };
