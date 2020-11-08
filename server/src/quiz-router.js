// @flow
import express from 'express';
import quizService, { type Quiz, type Category, type Question, type Option, type Rating } from './quiz-service';

/**
 * Express router containing quiz methods.
 */
const router: express$Router<> = express.Router();

export default router;

/**
 * Get all quizzes
 */

router.get('/quizzes', (request, response) => {
  quizService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Get quizzes with given category:
 */
router.get('/quizzes/category/:category', (request, response) => {
  const category = String(request.params.category);
  quizService
    .getQuizzesWithCategory(category)
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Get rating to quiz
 */

router.get('/quizzes/rating', (request, response) => {
  quizService
    .getRating()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Get quizzes with search
 */
router.get('/quizzes/search/:search', (request, response) => {
  const search = String(request.params.search);
  quizService
    .getQuizzesSearch(search)
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Get quiz with id:
 */

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
  if (
    data &&
    typeof data.quizquestion == 'string' &&
    data.quizquestion.length != 0 &&
    typeof data.option1 == 'string' &&
    data.option1.length != 0 &&
    typeof data.option2 == 'string' &&
    data.option2.length != 0 &&
    typeof data.option3 == 'string' &&
    data.option3.length != 0
  )
    quizService
      .createQuestion(
        request.body.quizid,
        request.body.quizquestion,
        request.body.option1,
        request.body.iscorrect1,
        request.body.option2,
        request.body.iscorrect2,
        request.body.option3,
        request.body.iscorrect3,
      )
      .then((quizquestionid) => response.send({ quizquestionid: quizquestionid }))
      .catch((error: Error) => response.status(500).send(error));
  else response.status(400).send('Missing question or options');
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

router.get('/quizzes/:quizId/questions', (request, response) => {
  const quizId = Number(request.params.quizId);
  quizService
    .getAllQuestionsInQuiz(quizId)
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizzes/questions/:quizQuestionId', (request, response) => {
  const quizQuestionId = Number(request.params.quizQuestionId);
  quizService
    .getQuestion(quizQuestionId)
    .then((Question) => response.send(Question))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizzes/questions/:quizQuestionId/options', (request, response) => {
  const quizQuestionId = Number(request.params.quizQuestionId);
  quizService
    .getQuestionOption(quizQuestionId)
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/quizzes/questions/:quizQuestionId/correct', (request, response) => {
  const quizQuestionId = Number(request.params.quizQuestionId);
  quizService
    .getQuestionOptionCorrect(quizQuestionId)
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Router for deleting quiz with given id.
 */
router.delete('/quizzes/:quizId', (request, response) => {
  const quizId = Number(request.params.quizId);
  quizService
    .deleteQuiz(quizId)
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Router for deleting questions with given quiz Id
 */

router.delete('/quizzes/:quizId/questions', (request, response) => {
  const quizId = Number(request.params.quizId);
  quizService
    .deleteQuizQuestions(quizId)
    .then((results) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Router for deleting question with given question Id
 */
router.delete('/quizzes/question/:quizQuestionId', (request, response) => {
  const quizQuestionId = Number(request.params.quizQuestionId);
  quizService
    .deleteQuestion(quizQuestionId)
    .then((results) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

router.delete('/quizzes/question/:quizQuestionId/options', (request, response) => {
  const quizQuestionId = Number(request.params.quizQuestionId);
  quizService
    .deleteOption(quizQuestionId)
    .then((results) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

/**
 * Router for updating quiz
 */
router.put('/quizzes', (request, response) => {
  const data = request.body;
  if (
    data &&
    typeof data.quiz_id == 'number' &&
    typeof data.quiz_name == 'string' &&
    data.quiz_name.length != 0 &&
    typeof data.quiz_category == 'string'
  )
    quizService
      .updateQuiz({
        quizId: data.quiz_id,
        quizName: data.quiz_name,
        quizCategory: data.quiz_category,
      })
      .then(() => response.send())
      .catch((error: Error) => response.status(500).send(error));
  else response.status(400).send('Missing quiz properties');
});
