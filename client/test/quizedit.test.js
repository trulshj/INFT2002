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
      return Promise.resolve({ quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' });
    }

    getAllQuestionsInQuiz(quizId: number) {
      return Promise.resolve([
        { quizQuestionId: 1, quizId: 1, question: 'Hva heter hovedstaden i Norge?' },
        { quizQuestionId: 2, quizId: 1, question: 'Hva heter hovedstaden i Sverige?' },
      ]);
    }

    getAllcategories() {
      return Promise.resolve([{ category_name: 'Geografi' }, { category_name: 'Kultur' }]);
    }

    getAll() {
      return Promise.resolve([
        { quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' },
        { quizId: 2, quizName: 'Tradisjoner i Norge', quizCategory: 'Kultur' },
      ]);
    }

    getQuestion(quizQuestionId: number) {
      return Promise.resolve({
        quizQuestionId: 1,
        quizId: 1,
        question: 'Hva heter hovedstaden i Norge?',
      });
    }

    getQuestionOption(quizQuestionId: number) {
      return Promise.resolve([
        { quizQuestionOptionId: 1, quizQuestionId: 1, question_answer: 'Oslo', is_correct: 1 },
        { quizQuestionOptionId: 2, quizQuestionId: 1, question_answer: 'Sverige', is_correct: 0 },
        { quizQuestionOptionId: 3, quizQuestionId: 1, question_answer: 'Moskva', is_correct: 0 },
      ]);
    }
    getQuestionOptionCorrect(quizQuestionId: number) {
      return Promise.resolve({
        quizQuestionOptionId: 1,
        quizQuestionId: 1,
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
describe('QuestionEdit component tests', () => {});
/**
 * QuizAddQuestion
 */
describe('QuizAddQuestion component tests', () => {});
