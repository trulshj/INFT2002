// @flow

import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, { type Quiz, type Category, type Question, type Option } from '../src/quiz-service';

const testQuiz: Quiz[] = [
  {quizId: 1, quizName: 'Fotballag', quizCategory: 'Kultur' },
  {quizId: 2, quizName: 'Land i Europa', quizCategory: 'Geografi' },
  {quizId: 3, quizName: 'Tradisjoner i Norge', quizCategory: 'Kultur' }
];

const testQuestion: QuizQuestion[] = [
  {quizQuestionId: 1, quizId: 2, question: 'Hva heter det største landet?' },
  {quizQuestionId: 2, quizId: 2, question: 'Hva heter det minste landet?' }
];

const testQuestionOption: QuizQuestionOption[] = [
  {quizQuestionOptionId: 1, quizQuestionId: 1, questionAnswer: 'Russland', isCorrect: true },
  {quizQuestionOptionId: 2, quizQuestionId: 1, questionAnswer: 'Norge', isCorrect: false },
  {quizQuestionOptionId: 3, quizQuestionId: 1, questionAnswer: 'Sverige', isCorrect: false }
];

const testCategory: Category[] = [
  {category_name: 'Geografi'},
  {category_name: 'Kultur'},
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
      .then(() => quizService.create(testQuiz[1].quizName, testQuiz[1].quizCategory)) 
      .then(() => quizService.create(testQuiz[2].quizName, testQuiz[2].quizCategory))
      .then(() => done());
  });
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE quiz_question', (error) => {
    if (error) return done.fail(error);

    quizService
      .create(testQuestion[0].quizId, testQuiz[0].question)
      .then(() => quizService.create(testQuestion[1].quizId, testQuiz[1].question)) 
      .then(() => done());
  });
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE quiz_question_option', (error) => {
    if (error) return done.fail(error);

    quizService
      .create(testQuestionOption[0].quizQuestionId, testQuestionOption[0].questionAnswer, testQuestionOption[0].isCorrect)
      .then(() => quizService.create(testQuestionOption[1].quizQuestionId, testQuestionOption[1].questionAnswer, testQuestionOption[1].isCorrect)) 
      .then(() => quizService.create(testQuestionOption[2].quizQuestionId, testQuestionOption[2].questionAnswer, testQuestionOption[2].isCorrect)) 
      .then(() => done());
  });
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE category', (error) => {
    if (error) return done.fail(error);

    quizService
      .create(testCategory[0].category_name)
      .then(() => quizService.create(testCategory[1].category_name)) 
      .then(() => done());
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

//Create new quiz (POST)
describe('Create new quiz (POST)', () => {
  test('Create new quiz (200 OK)', (done) => {
    axios
      .post<{}, number>('/quizzes', {
        quizname: 'Fotballag',
        quizCategory: 'Kultur'
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ quizid: 4 });
        done();
      });
  });

  test('Create new quiz (404 Not Found)', (done) => {
    axios
      .post<{}, number>('/quizzes', { category: '' })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Fetch quizzes (GET)
describe('Fetch quizzes (GET)', () => {
  test('Fetch all quizzes (200 OK)', (done) => {
    axios.get<Quiz[]>('/quizzes').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuiz);
      done();
    });
  });

  test('Fetch quiz (200 OK)', (done) => {
    axios.get<Quiz>('/quizzes/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuiz[0]);
      done();
    });
  });

  test('Fetch quiz (404 Not Found)', (done) => {
    axios
      .get<Quiz>('/quizzes/6')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Fetch categories (GET)
describe('Fetch categories (GET)', () => {
  test('Fetch all categories (200 OK)', (done) => {
    axios.get<Category[]>('/categories').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testCategory);
      done();
    });
  });

  test('Fetch category (200 OK)', (done) => {
    axios.get<Category>('/categories/Geografi').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testCategory[0]);
      done();
    });
  });

  test('Fetch category (404 Not Found)', (done) => {
    axios
      .get<Category>('/categories/Diverse')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Fetch questions (GET)
describe('Fetch questions (GET)', () => {
  test('Fetch all questions (200 OK)', (done) => {
    axios.get<QuizQuestion[]>('/quizzes/questions').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion);
      done();
    });
  });

  test('Fetch questions to a given quiz (200 OK)', (done) => {
    axios.get<QuizQuestion>('/quizzes/2/questions').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion[0], testQuestion[1]);
      done();
    });
  });

  test('Fetch a given question (200 OK)', (done) => {
    axios.get<QuizQuestion>('/quizzes/questions/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestion[0]);
      done();
    });
  });

  test('Fetch questions to a given quiz (404 Not Found)', (done) => {
    axios
      .get<QuizQuestion>('/quizzes/3/questions')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });

  test('Fetch a given question (404 Not Found)', (done) => {
    axios
      .get<QuizQuestion>('/quizzes/questions/3')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Fetch options (GET)
describe('Fetch options (GET)', () => {
  test('Fetch all options to a given question (200 OK)', (done) => {
    axios.get<QuizQuestionOption[]>('/quizzes/questions/1/options').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestionOption);
      done();
    });
  });

  test('Fetch correct option to a given question (200 OK)', (done) => {
    axios.get<QuizQuestionOption>('/quizzes/questions/1/correct').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testQuestionOption[0]);
      done();
    });
  });
});

//Delete quiz (DELETE)
describe('Delete quiz (DELETE)', () => {
  test('Delete quiz (200 OK)', (done) => {
    axios.delete('/quizzes/3').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('Delete quiz (500 Internal Server error)', (done) => {
    axios
      .delete('/quizzes/4')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 500');
        done();
      });
  });
});

//Delete questions (DELETE)
describe('Delete questions (DELETE)', () => {
  test('Delete questions with given quizId (200 OK)', (done) => {
    axios.delete('/quizzes/2/questions').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('Delete question with given questionId (200 OK)', (done) => {
    axios.delete('/quizzes/question/1').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('Delete questions with given quizId (500 Internal Server error)', (done) => {
    axios
      .delete('/quizzes/3/questions')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 500');
        done();
      });
  });

  test('Delete question with given questionId (500 Internal Server error)', (done) => {
    axios
      .delete('/quizzes/question/3')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 500');
        done();
      });
  });
});

//Delete options (DELETE)
describe('Delete options (DELETE)', () => {
  test('Delete options to a given question (200 OK)', (done) => {
    axios.delete('/quizzes/question/1/options').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('Delete options to a given question (500 Internal Server error)', (done) => {
    axios
      .delete('/quizzes/question/2/options')
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 500');
        done();
      });
  });
});

//Update quiz (UPDATE)
describe('Update quiz (UPDATE)', () => {
  test('Update quiz (200 OK)', (done) => {
    axios
      .put<{}, void>('/quizzes', {
        quizid: 1,
        quizName: 'Fotballag',
        quizCategory: 'Geografi'
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
  
  test('Update quiz (404 Not Found)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        quizid: 1,
        quizName: 'Fotballag'
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Update question (UPDATE)
describe('Update question (UPDATE)', () => {
  test('Update question (200 OK)', (done) => {
    axios
      .put<{}, void>('/quizzes', {
        quizQuestionId: 1,
        quizId: 2,
        question: 'Hva er befolkningen i Norge?'
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
  
  test('Update question (404 Not Found)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        question: 'Hva er befolkningen i Norge?'
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

//Update option (UPDATE)
describe('Update option (UPDATE)', () => {
  test('Update option (200 OK)', (done) => {
    axios
      .put<{}, void>('/quizzes', {
        quizQuestionOptionId: 2,
        quizQuestionId: 1,
        questionAnswer: 'Danmark',
        isCorrect: false
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
  
  test('Update option (404 Not Found)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        questionAnswer: 'Danmark'
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});