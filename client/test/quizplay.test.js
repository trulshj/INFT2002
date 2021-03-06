// @flow

import * as React from 'react';
import { QuizPlay, PlayOptions, PlayOptionAnswer } from '../src/components/quizplay';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../src/quiz-service';
import playService from '../src/play-service';
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
        { quiz_question_id: 1, quiz_id: 1, question: 'Hva heter hovedstaden i Norge?' },
        { quiz_question_id: 2, quiz_id: 1, question: 'Hva heter hovedstaden i Sverige?' },
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

    createRating(rating: number, quizId: number) {
      return Promise.resolve();
    }
  }
  return new QuizService();
});

describe('QuizPlay tests', () => {
  test('QuizPlay draws consitently', (done) => {
    const wrapper = shallow(<QuizPlay match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('PlayOptions tests', () => {
  test('PlayOptions draws consitently', (done) => {
    const wrapper = shallow(<PlayOptions quizQuestionId="1" />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('PlayOptionAnswer', () => {
  test('PlayOptionAnswer draws consitently', (done) => {
    const wrapper = shallow(<PlayOptionAnswer quizQuestionId="1" />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
