// @flow

import * as React from 'react';
import { NewQuiz, NewQuizQuestions } from '../src/newquiz';
import quizService, {type Category, type QuizQuestionOption, type QuizQuestion, type Quiz} from '../quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import { HashRouter, Route } from 'react-router-dom';

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
    
        create(quizName: string, quizCategory: string) {
            return Promise.resolve(3);
        }
    }


    return new QuizService();
});

describe('Newquiz tests', () => {
    test('Categories draws correctly', (done) => {
      const wrapper = shallow(<NewQuiz />);
  
      // Wait for events to complete
      setTimeout(() => {
        expect(
          wrapper.containsMatchingElements([
            <option value="Geografi" placeholder="Select an option">Geografi</option>
          ])
        ).toEqual(true);
        done();
      });
    });

    test('NewQuiz correctly sets location on create', (done) => {
        const wrapper = shallow(<NewQuiz />);
    
        wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Dyr i skogen' } });
        // $FlowExpectedError
        expect(wrapper.containsMatchingElement(<Form.Input value="Dyr i skogen" />)).toEqual(true);

        wrapper.find(select).simulate('change', { currentTarget: { value: 'Geografi' } });
        // $FlowExpectedError
        expect(wrapper.containsMatchingElement(<select value="Geografi" />)).toEqual(true);
    
        wrapper.find(Button.Success).simulate('click');
        // Wait for events to complete
        setTimeout(() => {
          expect(location.hash).toEqual('#/newQuiz/3');
          done();
        });
      });

    test('Sets New Quiz location correctly', (done) => {
        const wrapper = shallow(<NewQuiz />);
    
        // Wait for events to complete
        setTimeout(() => {
          expect(location.hash).toEqual('#/newQuiz');
          done();
        });
      });
})