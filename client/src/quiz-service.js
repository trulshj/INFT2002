// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Quiz = {
  quizid: number,
  quizname: string,
  quizcategory: string,
};

export type Quizquestion = {
  quizquestionid: number,
  quizid: number,
  question: string,
};

export type Category = {
  categoryname: string,
};


class QuizService {
  /**
   * Get quiz with given id.
   */
  get(id: number) {
    return axios.get<Quiz>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * Get all Quizzes.
   */
  getAll() {
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }

  /**
   * Create new Quiz having the given quizname.
   *
   * Resolves the newly created task id.
   */
  create(quizname: string, quizcategory: string) {
    return axios
      .post<{}, { id: number }>('/quizzes', {
        quizname: quizname,
        quizcategory: quizcategory,
      })
      .then((response) => response.data.id);
  }

  /**
   * Get all categorys
   */

   getAllCategorys() {
     return axios.get<Category[]>("/quizzes").then((response) => response.data)
   }
}

const quizService = new QuizService();
export default quizService;
