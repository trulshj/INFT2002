// @flow

import pool from './mysql-pool';

export type Quiz = {
  quizid: number,
  quizname: string,
  quizcategory: string,
};

class QuizService {
  /**
   * Get Quiz with given id.
   */
  get(id: number) {
    return new Promise<?Quiz>((resolve, reject) => {
      pool.query('SELECT * FROM Quiz WHERE id = ?', [id], (error, results: Quiz[]) => {
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
      pool.query('SELECT * FROM Quiz', (error, results) => {
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
  create(quizname: string, quizcategory: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Quiz SET quizname=?, quizcategory=?',
        [quizname, quizcategory],
        (error, results) => {
          if (error) return reject(error);
          if (!results.insertId) return reject(new Error('No row inserted'));

          resolve(Number(results.insertId));
        }
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
   * Add a question to a quiz
   */
  addQuestion(id: Number, question: Question) {
    return null;
  }
}

const quizService = new QuizService();
export default quizService;
