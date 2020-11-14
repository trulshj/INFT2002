// @flow

import * as React from 'react';
import { QuizEdit, QuestionEdit, QuizAddQuestion } from '../src/components/quizedit';
import quizService, {
  type Category,
  type QuizQuestionOption,
  type QuizQuestion,
  type Quiz,
} from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button } from '../src/widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';

jest.mock('../src/quiz-service', () => {
  class QuizService {
    get(quizId: number) {
      return Promise.resolve({ quiz_id: 1, quiz_name: 'Land i Europa', quiz_category: 'Geografi' });
    }

    getAllQuestionsInQuiz(quizId: number) {
      return Promise.resolve([
        { quiz_question_id: 1, quiz_id: 1, question: 'Hva heter hovedstaden i Norge?' },
        { quiz_question_id: 2, quiz_id: 1, question: 'Hva heter hovedstaden i Sverige?' },
      ]);
    }

    getAllcategories() {
      return Promise.resolve([{ category_name: 'Geografi' }, { category_name: 'Kultur' }]);
    }

    getAll() {
      return Promise.resolve([
        { quiz_id: 1, quiz_name: 'Land i Europa', quiz_category: 'Geografi' },
        { quiz_id: 2, quiz_name: 'Tradisjoner i Norge', quiz_category: 'Kultur' },
      ]);
    }

    getQuestion(quizQuestionId: number) {
      return Promise.resolve({
        quiz_question_id: 1,
        quiz_id: 1,
        question: 'Hva heter hovedstaden i Norge?',
      });
    }

    getQuestionOption(quizQuestionId: number) {
      return Promise.resolve([
        { quiz_question_option_id: 1, quiz_question_id: 1, question_answer: 'Oslo', is_correct: 1 },
        {
          quiz_question_option_id: 2,
          quiz_question_id: 1,
          question_answer: 'Sverige',
          is_correct: 0,
        },
        {
          quiz_question_option_id: 3,
          quiz_question_id: 1,
          question_answer: 'Moskva',
          is_correct: 0,
        },
      ]);
    }
    getQuestionOptionCorrect(quizQuestionId: number) {
      return Promise.resolve({
        quiz_question_option_id: 1,
        quiz_question_id: 1,
        question_answer: 'Oslo',
        is_correct: 1,
      });
    }

    updateQuiz(quiz: Quiz) {
      return Promise.resolve();
    }

    updateOption(option: QuizQuestionOption) {
      return Promise.resolve();
    }

    updateQuestion(question: QuizQuestion) {
      return Promise.resolve();
    }

    deleteOption(quizQuestionId: number) {
      return Promise.resolve();
    }

    deleteQuizQuestion(quizId: number) {
      return Promise.resolve();
    }

    deleteQuiz(quizId: number) {
      return Promise.resolve();
    }

    createQuestion() {
      return Promise.resolve();
    }
  }
  return new QuizService();
});

/**
 * QuizEdit
 */
describe('QuizEdit component tests', () => {
  test('QuizEdit draws correctly', (done) => {
    const wrapper = shallow(<QuizEdit match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);
      done();
    });
  });
});
/**
 * QuestionEdit
 */
describe('QuestionEdit component tests', () => {
  test('QuestionEdit draws correctly', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);
      done();
    });
  });
});
/**
 * QuizAddQuestion
 */
describe('QuizAddQuestion component tests', () => {});
