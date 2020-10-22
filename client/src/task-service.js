// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

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
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Quiz>('/quizzes/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string, questions: Question[]) {
    return axios
      .post<{}, { id: number }>('/tasks', {
        title: title,
        description: description,
        questions: questions,
      })
      .then((response) => response.data.id);
  }
}

const quizService = new QuizService();
export default quizService;
