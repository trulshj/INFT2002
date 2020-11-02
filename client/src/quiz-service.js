// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Quiz = {
  quizId: number,
  quizName: string,
  quizCategory: string,
};

export type QuizQuestion = {
  quizQuestionId: number,
  quizId: number,
  question: string,
};

export type QuizQuestionOption = {
  quizQuestionOptionId: number,
  quizQuestionId: number,
  questionAnswer: string,
  isCorrect: boolean,
};


export type Category = {
  category_name: string,
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
   */
  create(quizName: string, quizCategory: string) {
    return axios
      .post<{}, { quizId: number }>('/quizzes', {
        quizname: quizName,
        category: quizCategory,
      })
      .then((response) => {
        console.log(response);
        return response.data.quizid;
      });
  }
/**
 * 
 * Delete Quiz
 */
  delete(quizId: number) {
    return axios.delete<Quiz>('/quizzes/' + quizId).then((response) => response.data);
  }

  /**
   * Get all categories
   */
  getCategory(category: string) {
    return axios.get<Category>('/categories/' + category).then((response) => response.data);
  }

  getAllcategories() {
    return axios.get<Category[]>('/categories').then((response) => response.data);
  }


/**
    * Get all questions
*/

getAllquestions() {
  return axios.get<QuizQuestion[]>('/quizzes/questions').then((response) => response.data);
}

  /**
   * Create new Question having the given quizid.
   */

   
  createQuestion(quizId: number, quizQuestion: string) {
    return axios
      .post<{}, { quizQuestionId: number }>('/newQuiz', {quizid: quizId, quizquestion: quizQuestion })
      .then((response) => {
        console.log(response);
        return response.data.quizquestionid;
  });
}}
const quizService = new QuizService();
export default quizService;