// @flow
import express from 'express';
import quizService, { type Quiz, type Category, type Question, type Option } from './quiz-service';

/**
 * Express router containing quiz methods.
 */
const router: express$Router<> = express.Router();

export default router;

router.get('/quizzes', (request, response) => {
  quizService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizzes/:quizId', (request, response) => {
  const quizId = Number(request.params.quizId);
  quizService
    .get(quizId)
    .then((quiz) => (quiz ? response.send(quiz) : response.status(404).send('Quiz not found')))
    .catch((error: Error) => response.status(500).send(error));
});

//New quiz
router.post('/quizzes', (request, response) => {
  const data = request.body;
  if (
    data &&
    typeof data.quizname == 'string' &&
    data.quizname.length != 0 &&
    typeof data.category == 'string' &&
    data.category.length != 0
  )
    quizService
      .create(request.body.quizname, request.body.category)
      .then((quizid) => response.send({ quizid: quizid }))
      .catch((error: Error) => response.status(500).send(error));
  else response.status(400).send('Missing quizname or category');
});

//New question
router.post('/newQuiz', (request, response) => {
  const data = request.body;
  quizService
      .createQuestion(request.body.quizid, request.body.quizquestion)
      .then((quizquestionid) => response.send({ quizquestionid: quizquestionid }))
      .catch((error: Error) => response.status(500).send(error));
});

//New option
router.post('/newQuiz', (request, response) => {
  const data = request.body;
  quizService
      .createOption(request.body.quizquestionid, request.body.questionanswer, request.body.iscorrect)
      .then((quizquestionoptionid) => response.send({ quizquestionoptionid: quizquestionoptionid }))
      .catch((error: Error) => response.status(500).send(error));
});

/**
 * Express categories router
 */

router.get('/categories', (request, response) => {
  quizService
    .getAllcategories()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/categories/:categoryName', (request, response) => {
  const categoryName = String(request.params.categoryName);
  quizService
    .getCategory(categoryName)
    .then((categoryName) =>
      Category ? response.send(categoryName) : response.status(404).send('categoryname not found'),
    )
    .catch((error: Error) => response.status(500).send(error));
});


/**
 * Express questions router
 */

router.get('/quizzes/questions', (request, response) => {
  quizService
    .getAllquestions()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.delete('/quizzes/:id', (request, response) => {
  quizService
    .delete(Number(request.params.id))
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});


