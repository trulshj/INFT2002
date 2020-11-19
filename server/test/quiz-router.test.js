// @flow

/*Testene er ikke funksjonelle da vi ikke klarer å implementere en funksjon som kan 
TRUNCATE tabeller med fremmednøkler. Vi har prøvd ulike løsninger fra internett da
dette ikke har vært en del av pensum, men ingen har fungert etter hensikten. 
Denne problemløsningen har tatt mye unødvendig tid som har gått utover arbeidet på andre områder.
Vi mener på bakgrunn av dette at en tilsvarende problemstilling, da denne virker svært sentral i
prosjektet, burde blitt gjennomgått i tidligere leksjoner. Dette er ikke bare en problemstilling
vi alene som gruppe har opplevd, men noe vi deler med flere andre grupper.*/


import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import quizService, {
  type Quiz,
  type Category,
  type Question,
  type Option,
} from '../src/quiz-service';

const testQuiz: Quiz[] = [
  { quiz_id: 1, quiz_name: 'Fotballag', quiz_category: 'Kultur', username: 'Per' },
  { quiz_id: 2, quiz_name: 'Land i Europa', quiz_category: 'Geografi', username: 'Pål' },
  { quiz_id: 3, quiz_name: 'Tradisjoner i Norge', quiz_category: 'Kultur', username: 'Askeladden' },
];

const testQuestion: QuizQuestion[] = [
  { quiz_question_id: 1, quiz_id: 2, question: 'Hva heter det største landet?' },
  { quiz_question_id: 2, quiz_id: 2, question: 'Hva heter det minste landet?' },
];

const testQuestionOption: QuizQuestionOption[] = [
  {

       quiz_question_option_id: 1,

       quiz_question_id: 1,

       question_answer: 'Russland',

       is_correct: true,
  },
  { quiz_question_option_id: 2, quiz_question_id: 1, question_answer: 'Norge', is_correct: false },
  {

       quiz_question_option_id: 3,

       quiz_question_id: 1,

       question_answer: 'Sverige',

       is_correct: false,
   },
];

const testCategory: Category[] = [{ category_name: 'Geografi' }, { category_name: 'Kultur' }];

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  pool.query(
    'SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE quiz; SET FOREIGN_KEY_CHECKS = 1;',
    (error) => {
      if (error) return done.fail(error);

      quizService
        .create(testQuiz[0].quiz_name, testQuiz[0].quiz_category, testQuiz[0].username)
        .then(() =>

                   quizService.create(
            
            testQuiz[1].quiz_name,

                       testQuiz[1].quiz_category,

                       testQuiz[1].username,
          ),
        )
        .then(() =>
         
          quizService.create(
            
            testQuiz[2].quiz_name,
           
            testQuiz[2].quiz_category,
           
            testQuiz[2].username,
          ),
        )
        .then(() => done());
    },
  );
});

beforeEach((done) => {
  pool.query(
    'SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE quiz_question; SET FOREIGN_KEY_CHECKS = 1;',
    (error) => {
      if (error) return done.fail(error);

      quizService
        .create(testQuestion[0].quiz_id, testQuestion[0].question)
        .then(() => quizService.create(testQuestion[1].quiz_id, testQuestion[1].question))
        .then(() => done());
    },
  );
});

beforeEach((done) => {
  pool.query(
    'SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE quiz_question_option; SET FOREIGN_KEY_CHECKS = 1;',
    (error) => {
      if (error) return done.fail(error);

      quizService
        .create(
          testQuestionOption[0].quiz_question_id,
          testQuestionOption[0].question_answer,
          testQuestionOption[0].is_correct,
        )
        .then(() =>
          quizService.create(
            testQuestionOption[1].quiz_question_id,
            testQuestionOption[1].question_answer,
            testQuestionOption[1].is_correct,
          ),
        )
        .then(() =>
          quizService.create(
            testQuestionOption[2].quiz_question_id,
            testQuestionOption[2].question_answer,
            testQuestionOption[2].is_correct,
          ),
        )
        .then(() => done());
    },
  );
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => done());
});

//Create new quiz (POST)
describe('Create new quiz (POST)', () => {
  test('Create new quiz (200 OK)', (done) => {
    axios
      .post<{}, number>('/quizzes', {
        quiz_name: 'Fotballag',
        quiz_category: 'Kultur',
        username: 'Per',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ quiz_id: 4 });
        done();
      });
  });

  test('Create new quiz (404 Bad Request)', (done) => {
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
  test('Delete questions with given quiz_id (200 OK)', (done) => {
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

  test('Delete questions with given quiz_id (500 Internal Server error)', (done) => {
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
        quiz_id: 1,
        quiz_name: 'Fotballag',
        quiz_category: 'Geografi',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  test('Update quiz (400 Not Found)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        quiz_id: 1,
        quiz_name: 'Fotballag',
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

//Update question (UPDATE)
describe('Update question (UPDATE)', () => {
  test('Update question (200 OK)', (done) => {
    axios
      .put<{}, void>('/quizzes', {
        quiz_question_id: 1,
        quiz_id: 2,
        question: 'Hva er befolkningen i Norge?',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  test('Update question (400 Bad Request)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        question: 'Hva er befolkningen i Norge?',
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

//Update option (UPDATE)
describe('Update option (UPDATE)', () => {
  test('Update option (200 OK)', (done) => {
    axios
      .put<{}, void>('/quizzes', {
        quiz_question_option_id: 2,
        quiz_question_id: 1,
        question_answer: 'Danmark',
        is_correct: false,
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  test('Update option (400 Bad Request)', (done) => {
    axios
      // $FlowExpectedError
      .put<{}, number>('/quizzes', {
        question_answer: 'Danmark',
      })
      .then((response) => done.fail(new Error()))
      .catch((error: Error) => {
        expect(error.message).toEqual('Request failed with status code 400');
        done();
      });
  });
});

