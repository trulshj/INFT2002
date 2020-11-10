// @flow

import * as React from 'react';
import { NewQuiz, NewQuizQuestions } from '../src/components/newquiz';
import quizService, {type Category, type QuizQuestionOption, type QuizQuestion, type Quiz} from '../src/quiz-service';
import { shallow } from 'enzyme';
import { Card, Alert, Row, Column, Form, Button } from '../src/widgets';
import { HashRouter, Route } from 'react-router-dom';

jest.mock('../src/quiz-service', () => {
    class QuizService {
        getAllcategories() {
            return Promise.resolve([
                {category_name: 'Verden'},
                {category_name: 'Kultur'},
            ]);
        }

        getAll() {
            return Promise.resolve([
                {quizId: 1, quizName: 'Land i Europa', quizCategory: 'Verden' },
                {quizId: 2, quizName: 'Tradisjoner i Norge', quizCategory: 'Kultur' },
            ]);
        }
    
        create(quizName: string, quizCategory: string) {
            return Promise.resolve(3);        
        }
        createQuestion(quizId: number, question: string, option1: string, isCorrect1: boolean, option2: string, isCorrect2: boolean, option3: string, isCorrect3: boolean){
          return Promise.resolve({quizId: 1, question: "Hva heter hovedstaden i Norge?", option1: "Oslo", isCorrect1: true, option2: "Sverige", isCorrect2: false, option3: "Moskva", isCorrect3: false})
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
          wrapper.containsAllMatchingElements([
            <option value="Verden" placeholder="Select an option">Verden</option>
          ])
        ).toEqual(true);
        done();
      });
    });

    test('NewQuiz draws correctly', (done) => {
        const wrapper = shallow(<NewQuiz />);
    
        wrapper.find({ id: 'quizName'}).simulate('change', { currentTarget: { value: 'test' } })
        wrapper.find({ id: 'categoryValue'}).simulate('change', { currentTarget: { value: 'Verden' } })

        // Wait for events to complete
        setTimeout(() => {
          // $FlowExpectedError
          expect(wrapper.containsMatchingElement(<Form.Input value="test" />)).toEqual(true);
          expect(wrapper.containsMatchingElement("Verden")).toEqual(true);
          done();
        });
      });
      
      //Krever utbedring på 'select'
    test('NewQuiz correctly sets location on create', (done) => {
        const wrapper = shallow(<NewQuiz />);
    
        wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Land i Europa' } });
        // $FlowExpectedError
        expect(wrapper.containsMatchingElement(<Form.Input value="Land i Europa" />)).toEqual(true);

        wrapper.find(Form.Select).simulate('change', { currentTarget: { value: 'Verden' } });
        // $FlowExpectedError
        expect(wrapper.containsMatchingElement(<Form.Select value="Verden" />)).toEqual(true);

        wrapper.find(Button.Success).simulate('click');
        // Wait for events to complete
        setTimeout(() => {
          expect(location.hash).toEqual('#/newQuiz/1');
          done();
        });
      });
      });

describe('NewQuizQuestions tests', () => {
  test('NewQuizQuestions draws correctly', (done) => {
    const wrapper = shallow(<NewQuizQuestions />);
    
    wrapper.find({ id: 'question_id'}).simulate('change', { currentTarget: { value: 'test' } })
    wrapper.find({ id: 'isCorrect1'}).simulate('change', { currentTarget: { checked: 'true' }})
    
    // Wait for events to complete
    setTimeout(() => {
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="test" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="true" />)).toEqual(true);
      done();
     });
  })
});