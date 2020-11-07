// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type Quiz, type Category, type Question, type Option } from '../src/quiz-service';

const testQuiz: Quiz[] = [
  {quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' },
  {quizId: 2, quizName: 'Tradisjoner i Norge', quizCategory: 'Kultur' }
];

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE quiz', (error) => {
    if (error) return done.fail(error);

    quizService
      .create(testQuiz[0].quizName, testQuiz[0].quizCategory)
      .then(() => quizService.create(testQuiz[1].quizName, testQuiz[1].quizCategory)) // Create testQuiz[1] after testQuiz[0] has been created
      .then(() => done());
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});


//newquiz
describe('Create new quiz (POST)', () => {
  test('Create new quiz (200 OK)', (done) => {
    axios
      .post<{}, number>('/quizzes', {
        quizname: 'Fotballag',
        category: 'Kultur'
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ quizid: 3 });
        done();
      });
  });

  test('Create new quiz (400 Bad Request)', (done) => {
    axios
      .post<{}, number>('/quizzes', { quizname: '', category: '' })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});