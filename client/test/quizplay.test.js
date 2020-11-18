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

    createRating(rating: number, quizId: number) {
      return Promise.resolve({ rating: 5, quizId: 1 });
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
  }
  return new QuizService();
});

//Test for NavBar
describe('QuizPlay', () => {
  describe('QuizPlay tests', () => {
    test('PlayOptions draws correctly', (done) => {
      const wrapper = shallow(<QuizPlay match={{ params: { quizQuestionId: 1 } }} />);

      setTimeout(() => {
        expect(wrapper.containsMatchingElement(<h3>Questions:</h3>)).toEqual(true);
        done();
      });
    });

    test('ReactStars draws correctly', (done) => {
      const wrapper = shallow(<QuizPlay match={{ params: { quizQuestionId: 1 } }} />);

      wrapper.find({ id: 'buttonFinishQuiz' }).simulate('click');
      wrapper.find({ id: 'ratingStars' }).simulate('change', { currentTarget: { value: 4 } });

      // Wait for events to complete
      setTimeout(() => {
        // $FlowExpectedError

        expect(wrapper.find({ id: 'ratingStars', value: 4 }).length).toEqual(1);
        done();
      });
    });

    test('PlayOptions draws correctly', (done) => {
      const wrapper = shallow(<PlayOptions match={{ params: { quizQuestionId: 1 } }} />);
      wrapper
        .find({ id: 'questionChecked' })
        .simulate('change', { currentTarget: { checked: 'true' } });
      setTimeout(() => {
        expect(
          wrapper.containsAllMatchingElements([
            <Card title="Hva heter hovedstaden i Norge?"></Card>,
            <Column value="Oslo"></Column>,
            <Column value="Sverige"></Column>,
            <Column value="Moskva"></Column>,
            <Form.Checkbox checked="true" />,
          ]),
        ).toEqual(true);
        done();
      });
    });

    test('PlayOptionAnswer draws correctly', (done) => {
      const wrapper = shallow(<PlayOptionAnswer match={{ params: { quizQuestionId: 1 } }} />);

      setTimeout(() => {
        expect(
          wrapper.containsAllMatchingElements([
            <Card title="Hva heter hovedstaden i Norge?"></Card>,
            <Column value="Oslo"></Column>,
            <Column value="Sverige"></Column>,
            <Column value="Moskva"></Column>,
          ]),
        ).toEqual(true);
        done();
      });
    });
  });
});
