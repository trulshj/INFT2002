// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import userService from '../src/user-service';

type User = {
  username: string,
  password: string,
};

const testUsers: User[] = [
  { username: 'per', password: 'Password1' },
  { username: 'pål', password: 'Password1' },
  { username: 'askeladden', password: 'Password2' },
];

axios.defaults.baseURL = 'http://localhost:3002/api/v1';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3002, () => done());
});

beforeEach((done) => {
  // Delete all tasks, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE user_info', (error) => {
    if (error) return done.fail(error);

    // Create testTasks sequentially in order to set correct id, and call done() when finished
    userService
      .register(testUsers[0].username, testUsers[0].password)
      .then(() => userService.register(testUsers[1].username, testUsers[1].password)) // Create testUser[1] after testUser[0] has been created
      .then(() => userService.register(testUsers[2].username, testUsers[2].password)) // Create testUser[2] after testUser[1] has been created
      .then(() => done()); // Call done() after testUser[2] has been created
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Test login', () => {
  test('Successful login (200 OK)', (done) => {
    axios
      .post('/login', { username: testUsers[0].username, password: testUsers[0].password })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testUsers[0].username);
        done();
      });
  });

  test('Wrong password', (done) => {
    axios
      .post('/login', { username: testUsers[0].username, password: 'obviouslyWrongPassword' })
      .catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
  });

  test('User not found', (done) => {
    axios
      .post('/login', { username: 'RandomUsername', password: 'RandomPassword' })
      .catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
  });

  test('Username and password not strings', (done) => {
    axios.post('/login', { username: 12345, password: 12345678 }).catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });
});

describe('Test registration', () => {
  test('Succesfull registration', (done) => {
    axios
      .post('/register', { username: 'trulshj', password: 'randomPassword' })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  test('Username already taken', (done) => {
    axios
      .post('/register', { username: testUsers[0].username, password: 'Password3' })
      .catch((error: Error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
  });

  test('Username and password not strings', (done) => {
    axios.post('/register', { username: 12345, password: 12345678 }).catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });
});
