// @flow

import * as React from 'react';
import {
  QuizEdit, QuestionEdit, QuizAddQuestion,
} from '../src/components/quizedit';
import Quizzes from '../src/components/quizzes';

import {
  QuizDetail, QuestionDetail,
} from '../src/components/quizdetail';
import quizService, {type Category, type QuizQuestionOption, type QuizQuestion, type Quiz, type QuestionDetails, type getAllQuestionsInQuiz } from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button } from '../src/widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';

//Alle testene må omgjøres!

jest.mock('../src/quiz-service', () => {
    class QuizService {
        getAllcategories() {
            return Promise.resolve([
                {category_name: 'Geografi'},
                {category_name: 'Kultur'},
            ]);
        }

        getAll() {
            return Promise.resolve([
                {quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' },
                {quizId: 2, quizName: 'Tradisjoner i Norge', quizCategory: 'Kultur' },
            ]);
        }

        get(quizId: number) {
          return Promise.resolve({ quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' });
        }
    
        create(quizName: string, quizCategory: string) {
            return Promise.resolve(3);
        }

        deleteQuiz(quizId: number) {
          return Promise.resolve();
        }

        getQuizzesSearch(search: string) {
          return Promise.resolve();
        }

        getAllQuestionsInQuiz(quizId: number) {
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
        expect(wrapper.containsMatchingElement([
        <NavLink to="/quizzes/1">Land i Europa - Se fasit</NavLink>,
        <NavLink to="/quizzes/2">Tradisjoner i Norge - Se fasit</NavLink>])
        .toEqual(true)
        .done()
        )}
      )}
    )}
  );

  describe('QuizDetail tests', () => {
  test('QuizDetail draws correctly with MatchingElement', (done) => {
    const wrapper = shallow(<QuizDetail match={{ params: { quizId: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper.containsMatchingElement(<Card>Land i Europa</Card>)).toEqual(true);
      done();
    });
  });
});