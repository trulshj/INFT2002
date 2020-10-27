// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type Quiz } from '../src/quiz-service';

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Quizzes', (error) => {
    if (error) return done.fail(error);
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});
