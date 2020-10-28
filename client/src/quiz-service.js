// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Quiz = {
  quizId: number,
  quizName: string,
  quizCategory: string,
};

export type Quizquestion = {
  quizQuestionId: number,
  quizId: number,
  question: string,
};

export type Category = {
  category: string,
};


class QuizService {
  /**
   * Get quiz with given id.
   */
  get(quizId: number) {
    return axios.get<Quiz>('/quizzes/' + quizId).then((response) => response.data);
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
  create(quizName: string, category: string) {
    return axios
      .post<{}, { id: number }>('/quizzes', {
        quizName: quizName,
        category: category,
      })
      .then((response) => response.data.quizId);
  }

  /**
   * Get all categorys
   */
  getCategory(category: string) {
    return axios.get<Category>('/categorys/' + category).then((response) => response.data);
  }

   getAllCategorys() {
     return axios.get<Category[]>("/categorys").then((response) => response.data)
   }
}

const quizService = new QuizService();
export default quizService;
