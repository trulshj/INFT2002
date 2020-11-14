// @flow

import * as React from 'react';
import { Quizzes } from '../src/components/quizzes';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../src/widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

jest.mock('../src/quiz-service', () => {
  class QuizService {
    getAll() {
      return Promise.resolve([
        { quiz_id: 1, quiz_name: 'Land i Europa', quiz_category: 'Geografi' },
        { quiz_id: 2, quiz_name: 'Tradisjoner i Norge', quiz_category: 'Kultur' },
      ]);
    }

    getAllcategories() {
      return Promise.resolve([{ category_name: 'Geografi' }, { category_name: 'Kultur' }]);
    }

    getQuizzesSearch(search: string) {
      return Promise.resolve();
    }

    getQuizzesWithCategory(category: string) {
      return Promise.resolve();
    }
  }
  return new QuizService();
});

describe('Quizzes tests', () => {
  test('Quizzes draws correctly', (done) => {
    const wrapper = shallow(<Quizzes />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/quizzes/1">Land i Europa - Se fasit</NavLink>,
          <NavLink to="/quizzes/2">Tradisjoner i Norge - Se fasit</NavLink>,
        ]),
      ).toEqual(true);
      done();
    });
  });

  test('Searchboxes draws correctly', (done) => {
    const wrapper = shallow(<Quizzes />);

    wrapper
      .find({ id: 'quizNameSearch' })
      .simulate('change', { currentTarget: { value: 'Europa' } });
    wrapper
      .find({ id: 'categoryValue' })
      .simulate('change', { currentTarget: { value: 'Geografi' } });

    // Wait for events to complete
    setTimeout(() => {
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Europa" />)).toEqual(true);
      expect(wrapper.containsMatchingElement('Geografi')).toEqual(true);
      done();
    });
  });
});
