// @flow
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Quiz = {
  quizId: number,
  quizName: string,
  quizCategory: string,
  rating: number,
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

export type QuestionDetails = {
  quizId: number,
  questionId: number,
  question: string,
  options: {
    optionId: number,
    questionOption: string,
    isCorrect: number,
  }[],
};

class QuizService {
  /**
   * Get quiz with given id.
   */
  get(quizId: number) {
    return axios.get<Quiz>('/quizzes/' + quizId).then((response) => response.data);
  }

  /**
   * Get all quizzes.
   */
  getAll() {
    return axios.get<Quiz[]>('/quizzes').then((response) => response.data);
  }

  /**
   * Get quizzes with given category
   */
  getQuizzesWithCategory(category: string) {
    return axios.get<Quiz[]>('/quizzes/category/' + category).then((response) => response.data);
  }
  /**
   * Getting quizzes with search
   */
  getQuizzesSearch(search: string) {
    return axios.get<Quiz[]>('quizzes/search/' + search).then((response) => response.data);
  }

  /**
   * Create new quiz having the given quizname.
   */
  create(quizName: string, quizCategory: string, user: string) {
    return axios
      .post<{}, { quizId: number }>('/quizzes', {
        quizname: quizName,
        category: quizCategory,
        user: user,
      })
      .then((response) => {
        //console.log(response);
        return response.data.quizid;
      });
  }

  /**
   * Delete quiz
   */
  deleteQuiz(quizId: number) {
    return axios.delete<void>('/quizzes/' + quizId).then((response) => response.data);
  }

  /**
   * Delete quiz questions
   * Needed for delete quiz and can't be the same as deleteQuestion as deleteQuestion uses quizQuestionId not quizId
   */
  deleteQuizQuestions(quizId: number) {
    return axios
      .delete<void>('/quizzes/' + quizId + '/questions')
      .then((response) => response.data);
  }

  /**
   * Update quiz
   */
  updateQuiz(quiz: Quiz) {
    return axios.put<Quiz, void>('/quizzes', quiz).then((response) => response.data);
  }

  /**
   * Get category having a given name
   */
  getCategory(category: string) {
    return axios.get<Category>('/categories/' + category).then((response) => response.data);
  }

  /**
   * Get all categories
   */
  getAllcategories() {
    return axios.get<Category[]>('/categories').then((response) => response.data);
  }

  /**
   * Get all details
   */
  getAllDetails() {
    return axios.get<QuestionAndOption[]>('/alldetails').then((response) => response.data);
  }

  /**
   * Get all questions
   */

  getAllquestions() {
    return axios.get<QuizQuestion[]>('/quizzes/questions').then((response) => response.data);
  }

  /**
   * Get all questions that belong to quiz with given quizId
   */
  getAllQuestionsInQuiz(quizId: number) {
    return axios
      .get<QuizQuestion[]>('/quizzes/' + quizId + '/questions')
      .then((response) => response.data);
  }

  /**
   * Get spesific question
   */
  getQuestion(quizQuestionId: number) {
    return axios
      .get<QuizQuestion>('quizzes/questions/' + quizQuestionId)
      .then((response) => response.data);
  }

  /**
   * Get question options for spesific question
   */
  getQuestionOption(quizQuestionId: number) {
    return axios
      .get<QuizQuestionOption[]>('/quizzes/questions/' + quizQuestionId + '/options')
      .then((response) => response.data);
  }

  /**
   * Get correct question option for spesific question
   */
  getQuestionOptionCorrect(quizQuestionId: number) {
    return axios
      .get<QuizQuestionOption[]>('/quizzes/questions/' + quizQuestionId + '/correct')
      .then((response) => response.data);
  }

  /**
   * Create new question having the given quizid
   */
  createQuestion(
    quizId: number,
    quizQuestion: string,
    option1: string,
    isCorrect1: boolean,
    option2: string,
    isCorrect2: boolean,
    option3: string,
    isCorrect3: boolean,
  ) {
    return axios
      .post<{}, { quizQuestionId: number }>('/newQuiz', {
        quizid: quizId,
        quizquestion: quizQuestion,
        option1: option1,
        iscorrect1: isCorrect1,
        option2: option2,
        iscorrect2: isCorrect2,
        option3: option3,
        iscorrect3: isCorrect3,
      })
      .then((response) => {
        //console.log(response);
        return response.data.quizquestionid;
      });
  }

  /**
   * Create new rating having the given quizid
   */
  createRating(rating: number, quizId: number) {
    return axios
      .post<{}, { rating: number }>('/quizzes/' + quizId  + "/" + rating)
      .then((response) => {
        //console.log(response);
        return response.data.rating;
      });
  }

  /**
   * Create new option to quizquestion having the given quizquestionid
   */
  createOption(
    quizQuestionId: number,
    questionAnswer1: string,
    isCorrect1: boolean,
    questionAnswer2: string,
    isCorrect2: boolean,
    questionAnswer3: string,
    isCorrect3: boolean,
  ) {
    return axios
      .post<{}, { quizQuestionOptionId: number }>('/newQuiz', {
        quizquestionid: quizQuestionId,
        questionanswer1: questionAnswer1,
        iscorrect1: isCorrect1,
        questionanswer2: questionAnswer1,
        iscorrect2: isCorrect1,
        questionanswer3: questionAnswer1,
        iscorrect3: isCorrect1,
      })
      .then((response) => {
        //console.log(response);
        return response.data.quizquestionoptionid;
      });
  }

  /**
   * Delete question with given question id
   */
  deleteQuestion(quizQuestionId: number) {
    return axios
      .delete<void>('/quizzes/question/' + quizQuestionId)
      .then((response) => response.data);
  }

  /**
   * Delete options with given question id
   */
  deleteOption(quizQuestionId: number) {
    return axios
      .delete<void>('/quizzes/question/' + quizQuestionId + '/options')
      .then((response) => response.data);
  }

  updateQuestion(question: QuizQuestion) {
    return axios
      .put<QuizQuestion, void>('/quizzes/questions', question)
      .then((response) => response.data);
  }

  updateOption(option: QuizQuestionOption) {
    return axios
      .put<QuizQuestionOption, void>('/quizzes/questions/options', option)
      .then((response) => response.data);
  }
}

const quizService = new QuizService();
export default quizService;
