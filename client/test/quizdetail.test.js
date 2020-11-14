// @flow

import * as React from 'react';
import {QuizDetail, QuestionDetail} from '../src/components/quizdetail';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../src/widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

jest.mock('../src/quiz-service', () => {
    class QuizService {
        get(quizId: number) {
          return Promise.resolve({ quizId: 1, quizName: 'Land i Europa', quizCategory: 'Geografi' });
        }
    
        getAllQuestionsInQuiz(quizId: number) {
          return Promise.resolve([ 
            {quizQuestionId: 1, quizId: 1, question: 'Hva heter det største landet?' },
            {quizQuestionId: 2, quizId: 1, question: 'Hva heter det minste landet?' }
          ]);
        }

        getQuestion(quizQuestionId: number) {
          return Promise.resolve({quizQuestionId: 1, quizId: 1, question: 'Hva heter det største landet?'});
        }
      
        getQuestionOption(quizQuestionId: number) {
          return Promise.resolve([ 
            {quizQuestionOptionId: 1, quizQuestionId: 1, questionAnswer: 'Russland', isCorrect: true },
            {quizQuestionOptionId: 2, quizQuestionId: 1, questionAnswer: 'Norge', isCorrect: false },
            {quizQuestionOptionId: 3, quizQuestionId: 1, questionAnswer: 'Sverige', isCorrect: false }
          ]);
        }
      
        getQuestionOptionCorrect(quizQuestionId: number) {
          return Promise.resolve({quizQuestionOptionId: 1, quizQuestionId: 1, questionAnswer: 'Russland', isCorrect: true});
        }
    }
    return new QuizService();
});

describe('QuizDetail tests', () => {
  test('QuizDetail draws correctly', (done) => {
    const wrapper = shallow(<QuizDetail match={{ params: { quizId: 1 } }}/>);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/quizzes/1/1">Hva heter det største landet?</NavLink>,
          <NavLink to="/quizzes/1/2">Hva heter det minste landet?</NavLink>,
        ])
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