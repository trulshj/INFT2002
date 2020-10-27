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
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Tasks WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    });
  }

  /**
   * Update given task.
   */
  update(task: Task) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Tasks SET title=?, description=?, done=? WHERE id=?',
        [task.title, task.description, task.done, task.id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

const quizService = new QuizService();
export default quizService;
