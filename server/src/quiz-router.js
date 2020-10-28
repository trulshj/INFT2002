// @flow
import express from 'express';
import quizService, { type Quiz, type Category } from './quiz-service';

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
  
  router.get('/quizzes/:quizid', (request, response) => {
    const quizid = Number(request.params.quizid);
    quizService
      .get(quizid)
      .then((quiz) => (quiz ? response.send(quiz) : response.status(404).send('quiz not found')))
      .catch((error: Error) => response.status(500).send(error));
  });
  
  // Example request body: { title: "Ny oppgave" }
  // Example response body: { id: 4 }
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


  /**
   * Express categorys router
   */
  
  router.get('/categorys', (request, response) => {
    quizService
    .getAllCategorys()
    .then((rows) => response.send(rows))
    .catch((error: Error) => response.status(500).send(error));
  }); 

  router.get('/categorys/:categoryName', (request, response) => {
    const categoryName = Number(request.params.categoryName);
    quizService
      .getCategory(categoryName)
      .then((categoryName) => (Category ? response.send(categoryName) : response.status(404).send('categoryname not found')))
      .catch((error: Error) => response.status(500).send(error));
  });