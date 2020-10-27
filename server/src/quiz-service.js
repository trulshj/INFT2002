// @flow

import pool from './mysql-pool';

export type Quiz = {
  id: number,
  title: string,
  description: string,
  questions: Question[],
};

export type Question = {
  id: number,
  question: string,
  answer: string,
  options: string[],
};

class QuizService {
  /**
   * Get quiz with given id.
   */
  get(id: number) {
    return null;
  }

  /**
   * Get all quizzes.
   */
  getAll() {
    return null;
  }

  /**
   * Create new quiz having the given title and description
   *
   * Resolves the newly created quiz id.
   */
  create(title: string, description: string) {
    return null;
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
