// @flow

import pool from './mysql-pool';

export type Quiz = {
  quizId: number,
  quizName: string,
  quizCategory: string,
};

export type Category = {
  categoryName: string,
};

class QuizService {
  /**
   * Get Quiz with given id.
   */
  get(quizId: number) {
    return new Promise<?Quiz>((resolve, reject) => {
      pool.query('SELECT * FROM quiz WHERE quiz_id = ?', [quizId], (error, results: Quiz[]) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  /**
   * Get all Quizzes.
   */
  getAll() {
    return new Promise<Quiz[]>((resolve, reject) => {
      pool.query('SELECT * FROM quiz ORDER BY quiz_category', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  /**
   * Create new Quiz having the given title.
   *
   * Resolves the newly created quiz id.
   */
  create(quizName: string, quizCategory: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO quiz SET quiz_name=?, quiz_category=?',
        [quizName, quizCategory],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        },
      );
    });
  }

  /**
   * Create new Question with multiple options.
   */
  //INSERT INTO quiz_question_option SET quiz_question_id=1, question_answer="Fotball", is_correct=1
  createQuestion(quizId: number, quizQuestion: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO quiz_question SET quiz_id=?, question=?',
        [quizId],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        },
      );
    });
  }

  /**
   * Create new Option to question
   */
  //INSERT INTO quiz_question_option SET quiz_question_id=1, question_answer="Fotball", is_correct=1
  createOption(quizQuestionId: number, questionAnswer: string, is_correct: Boolean) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO quiz_question_option SET quiz_question_id=?, question_answer=?, is_correct=?',
        [quizQuestionId, questionAnswer, is_correct],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        },
      );
    });
  }

  /**
   * Delete quiz with given id.
   */
  delete(id: number) {
    return null;
  }

  /**
   * Update given quiz.
   *
   * Pass a quiz object, will update the row with the specified id with the new object
   */
  update(quiz: Quiz) {
    return null;
  }

  /**
   * Get Category with given id.
   */
  getCategory(categoryName: string) {
    return new Promise<?Category>((resolve, reject) => {
      pool.query(
        'SELECT * FROM category WHERE category_name = ?',
        [categoryName],
        (error, results: Category[]) => {
          if (error) return reject(error);

          resolve(results[0]);
        },
      );
    });
  }

  getAllcategories() {
    return new Promise<Category[]>((resolve, reject) => {
      pool.query('SELECT * FROM category', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }
}

const quizService = new QuizService();
export default quizService;
