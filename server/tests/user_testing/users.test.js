const mongoose = require('mongoose');
const connectDb = require('../../config/db');
const supertest = require('supertest');
const helper = require('./users_helpers');
const app = require('../../app');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

const api = supertest(app);

// This deletes every blog already in the db, and inserts the ones defined in the helper module before all the test.
beforeAll(async () => {
  await connectDb();
  await User.deleteMany({});

  const promisesUsers = helper.initialUsers.map(async (user) => {
    const newPassword = await bcrypt.hash(user.password, 10);
    user.password = newPassword;
    return new User(user);
  });
  const usersObjects = await Promise.all(promisesUsers);
  const promise = usersObjects.map((user) => user.save());
  await Promise.all(promise);
}, 100000);

describe('Auth testing register', () => {
  test('User added on good operation', async () => {
    const newUser = {
      email: 'anotheruser@yahoo.com',
      password: 'newuseriam',
      first_name: 'Man',
      last_name: 'Woman',
    };

    await api
      .post('/api/users/register')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersInDb = await api.get('/api/users/all');
    expect(usersInDb.body.users).toHaveLength(helper.initialUsers.length + 1);
  }, 100000);

  test('Returns accurate error on existing email.', async () => {
    const newUser = {
      email: 'leandro.bovino@gmail.com',
      password: 'registeredalready',
      first_name: 'Man',
      last_name: 'Woman',
    };

    const res = await api.post('/api/users/register').send(newUser);
    expect(res.status).toEqual(400);
    expect(res.body.msg).toEqual(
      'The email already has an account linked to it'
    );
  }, 100000);
});

/* describe('Friend requests testings', () => {
  test('Friend request sent', async () => {
    const userLog = {
      email: helper.notMutatedUsers[0].email,
      password: helper.notMutatedUsers[0].password,
    };
    const log = await api
      .post('/api/users/login/local')
      .send(userLog)
      .expect(200);
    const token = log.body.token;

    const res = await api.get('/api/users/all').expect(200);

    const user = res.body.users[1];

    await api.put('/api/users/friend_request').set('Authorization', `Bearer ${token}`).send({ id: user._id }).expect(200);

  }, 100000);
}); */

afterAll(async () => {
  await mongoose.connection.close();
});
