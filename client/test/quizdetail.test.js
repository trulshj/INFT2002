// @flow

import * as React from 'react';
import { QuizDetail, QuestionDetail } from '../src/components/quizdetail';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../src/widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

jest.mock('../src/quiz-service', () => {
  class QuizService {
    get(quizId: number) {
      return Promise.resolve({ quiz_id: 1, quiz_name: 'Land i Europa', quiz_category: 'Geografi' });
    }

    getAllQuestionsInQuiz(quizId: number) {
      return Promise.resolve([
        { quiz_question_id: 1, quiz_id: 1, question: 'Hva heter det største landet?' },
        { quiz_question_id: 2, quiz_id: 1, question: 'Hva heter det minste landet?' },
      ]);
    }

    getQuestion(quizQuestionId: number) {
      return Promise.resolve({
        quiz_question_id: 1,
        quiz_id: 1,
        question: 'Hva heter det største landet?',
      });
    }

    getQuestionOption(quizQuestionId: number) {
      return Promise.resolve([
        {
          quiz_question_option_id: 1,
          quiz_question_id: 1,
          question_answer: 'Russland',
          is_correct: true,
        },
        {
          quiz_question_option_id: 2,
          quiz_question_id: 1,
          question_answer: 'Norge',
          is_correct: false,
        },
        {
          quiz_question_option_id: 3,
          quiz_question_id: 1,
          question_answer: 'Sverige',
          is_correct: false,
        },
      ]);
    }

    getQuestionOptionCorrect(quizQuestionId: number) {
      return Promise.resolve({
        quiz_question_option_id: 1,
        quiz_question_id: 1,
        question_answer: 'Russland',
        is_correct: true,
      });
    }
  }
  return new QuizService();
});

describe('QuizDetail tests', () => {
  test('QuizDetail draws correctly', (done) => {
    const wrapper = shallow(<QuizDetail match={{ params: { quizId: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/quizzes/1/1">Hva heter det største landet?</NavLink>,
          <NavLink to="/quizzes/1/2">Hva heter det minste landet?</NavLink>,
        ]),
      ).toEqual(true);
      done();
    });
  });
});

describe('QuestionDetail tests', () => {
  test('QuestionDetail draws correctly with MatchingElement', (done) => {
    const wrapper = shallow(<QuestionDetail match={{ params: { quizQuestionId: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper.containsMatchingElement(<Column>Norge</Column>)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Column>Sverige</Column>)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Column>Sverige</Column>)).toEqual(true);
      done();
    });
  });
});
