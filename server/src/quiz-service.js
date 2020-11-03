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

export type Question = {
  quizQuestionId: number,
  quizId: number,
  question: string,
};

export type Option = {
  quizQuestionOptionId: number,
  quizQuestionId: number,
  questionAnswer: string,
  isCorrect: boolean,
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
   * Create new Question.
   */

  createQuestion(
    quizId: number,
    quizQuestion: string,
    option1: string,
    iscorrect1: boolean,
    option2: string,
    iscorrect2: boolean,
    option3: string,
    iscorrect3: boolean,
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO quiz_question SET quiz_id=?, question=?',
        [quizId, quizQuestion],
        (error, results) => {
          pool.query(
            'INSERT INTO quiz_question_option (quiz_question_id, question_answer, is_correct) values (?, ?, ?)',
            [results.insertId, option1, iscorrect1],
            (error, results) => {
              if (error) return reject(error);
              console.log(error)
            },
          );
          
          pool.query(
            'INSERT INTO quiz_question_option (quiz_question_id, question_answer, is_correct) values (?, ?, ?)',
            [results.insertId, option2, iscorrect2],
            (error, results) => {
              if (error) return reject(error);
              console.log(error)
            },
          );

          pool.query(
            'INSERT INTO quiz_question_option (quiz_question_id, question_answer, is_correct) values (?, ?, ?)',
            [results.insertId, option3, iscorrect3],
            (error, results) => {
              if (error) return reject(error);
              console.log(error)
    
            },
          );

          if (error) return reject(error);
          console.log(error)

          resolve();
        },
      );
    });
  }


  /**
   * Delete quiz with given id.
   */
  delete(quizId: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM quiz WHERE quiz_id = ?', [quizId], (error, results) => {
        if (error) return reject(error);
        if (!results.affectedRows) reject(new Error('No row deleted'));

        resolve();
      });
    });
  }

  /**
   * Update given quiz.
   *
   * NB Not yet inplemented!
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

  /**
   * Get all Questions || Brukes ikke
   */

  getAllquestions() {
    return new Promise<Question[]>((resolve, reject) => {
      pool.query('SELECT * FROM quiz_question', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }
}

const quizService = new QuizService();
export default quizService;
