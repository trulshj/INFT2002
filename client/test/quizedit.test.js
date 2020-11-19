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

    deleteQuestion(quizQuestionId: number) {
      return Promise.resolve();
    }

    deleteQuizQuestions(quizId: number) {
      return Promise.resolve();
    }

    deleteQuiz(quizId: number) {
      return Promise.resolve();
    }

    deleteRating(quizId: number) {
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
          <Form.Input value="Land i Europa" />,
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);
      done();
    });
  });

  test('QuizEdit correctly changes title and category', (done) => {
    const wrapper = shallow(<QuizEdit match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input value="Land i Europa" />,
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);

      wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Rundt i Europa' } });
      wrapper
        .find({ id: 'categoryValue' })
        .simulate('change', { currentTarget: { value: 'Kultur' } });

      setTimeout(() => {
        expect(wrapper.containsMatchingElement('Kultur')).toEqual(true);
        expect(wrapper.containsMatchingElement(<Form.Input value="Rundt i Europa" />)).toEqual(
          true,
        );
        done();
      });
    });
  });

  test('QuizEdit correctly sets location on add Question', (done) => {
    const wrapper = shallow(<QuizEdit match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input value="Land i Europa" />,
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);

      wrapper.find(Button.Success).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes/1/edit/addQuestion');
        done();
      });
    });
  });

  test('QuizEdit correctly sets location on save', (done) => {
    const wrapper = shallow(<QuizEdit match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input value="Land i Europa" />,
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);

      wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Rundt i Europa' } });
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Rundt i Europa" />)).toEqual(true);

      wrapper.find(Button.Light).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes');
        done();
      });
    });
  });

  test('QuizEdit correctly sets location on delete', (done) => {
    const wrapper = shallow(<QuizEdit match={{ params: { quizId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input value="Land i Europa" />,
          <NavLink to="/quizzes/1/1/edit">Hva heter hovedstaden i Norge?</NavLink>,
          <NavLink to="/quizzes/1/2/edit">Hva heter hovedstaden i Sverige?</NavLink>,
        ]),
      ).toEqual(true);

      wrapper.find(Button.Danger).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes');
        done();
      });
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
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);
      done();
    });
  });

  test('QuestionEdit correctly changes question name', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);

      wrapper
        .find({ id: 'questionTitle' })
        .simulate('change', { currentTarget: { value: 'Hva heter hovedstaden i Russland?' } });

      setTimeout(() => {
        expect(
          wrapper.containsMatchingElement(
            <Form.Input id="questionTitle" value="Hva heter hovedstaden i Russland?" />,
          ),
        ).toEqual(true);
        done();
      });
    });
  });

  //.at(2) temp solution untill good way to find id for Form.Input
  test('QuestionEdit correctly changes option 2 name', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);

      wrapper
        .find({ id: 'optionAnswer' })
        .at(1)
        .simulate('change', { currentTarget: { value: 'Stockholm' } });

      setTimeout(() => {
        expect(wrapper.containsMatchingElement(<Form.Input value="Stockholm" />)).toEqual(true);
        done();
      });
    });
  });

  test('QuestionEdit correctly changes option 1 and 2 correct status', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);

      wrapper
        .find({ id: 'optionCheckbox' })
        .at(0)
        .simulate('change', { currentTarget: { checked: 'false' } });

      setTimeout(() => {
        expect(wrapper.containsMatchingElement(<Form.Checkbox checked="true" />)).toEqual(false);

        wrapper
          .find({ id: 'optionCheckbox' })
          .at(1)
          .simulate('change', { currentTarget: { checked: 'true' } });

        setTimeout(() => {
          expect(wrapper.containsMatchingElement(<Form.Checkbox checked="true" />)).toEqual(true);
        });
      });
    });
    done();
  });

  test('QuestionEdit correctly sets location on save', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?"></Form.Input>,
          <Form.Input value="Oslo"></Form.Input>,
          <Form.Input value="Sverige"></Form.Input>,
          <Form.Input value="Moskva"></Form.Input>,
        ]),
      ).toEqual(true);

      wrapper.find(Button.Light).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes/1/edit');
        done();
      });
    });
  });

  test('QuestionEdit correctly sets location on delete', (done) => {
    const wrapper = shallow(<QuestionEdit match={{ params: { quizQuestionId: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Form.Input id="questionTitle" value="Hva heter hovedstaden i Norge?" />,
          <Form.Input value="Oslo" />,
          <Form.Input value="Sverige" />,
          <Form.Input value="Moskva" />,
        ]),
      ).toEqual(true);

      wrapper.find(Button.Danger).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes/1/edit');
        done();
      });
    });
  });
});
/**
 * QuizAddQuestion
 */
describe('QuizAddQuestion component tests', () => {
  test('QuizAddQuestion draws correctly', (done) => {
    const wrapper = shallow(<QuizAddQuestion match={{ params: { quizId: 1 } }} />);

    wrapper
      .find({ id: 'question_id' })
      .simulate('change', { currentTarget: { value: 'Hvilket land ligger i Europa?' } });
    wrapper.find({ id: 'option1' }).simulate('change', { currentTarget: { value: 'Norge' } });
    wrapper.find({ id: 'isCorrect1' }).simulate('change', { currentTarget: { checked: 'true' } });
    wrapper.find({ id: 'option2' }).simulate('change', { currentTarget: { value: 'USA' } });
    wrapper.find({ id: 'isCorrect2' }).simulate('change', { currentTarget: { checked: 'false' } });
    wrapper.find({ id: 'option3' }).simulate('change', { currentTarget: { value: 'Kina' } });
    wrapper.find({ id: 'isCorrect3' }).simulate('change', { currentTarget: { checked: 'false' } });

    // Wait for events to complete
    setTimeout(() => {
      // $FlowExpectedError
      expect(
        wrapper.containsMatchingElement(<Form.Input value="Hvilket land ligger i Europa?" />),
      ).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="Norge" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="true" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="USA" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="false" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="Kina" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="false" />)).toEqual(true);
      done();
    });
  });

  test('QuizAddQuestion correctly sets location on add', (done) => {
    const wrapper = shallow(<QuizAddQuestion match={{ params: { quizId: 1 } }} />);

    wrapper
      .find({ id: 'question_id' })
      .simulate('change', { currentTarget: { value: 'Hvilket land ligger i Europa?' } });
    wrapper.find({ id: 'option1' }).simulate('change', { currentTarget: { value: 'Norge' } });
    wrapper.find({ id: 'isCorrect1' }).simulate('change', { currentTarget: { checked: 'true' } });
    wrapper.find({ id: 'option2' }).simulate('change', { currentTarget: { value: 'USA' } });
    wrapper.find({ id: 'isCorrect2' }).simulate('change', { currentTarget: { checked: 'false' } });
    wrapper.find({ id: 'option3' }).simulate('change', { currentTarget: { value: 'Kina' } });
    wrapper.find({ id: 'isCorrect3' }).simulate('change', { currentTarget: { checked: 'false' } });

    // Wait for events to complete
    setTimeout(() => {
      // $FlowExpectedError
      expect(
        wrapper.containsMatchingElement(<Form.Input value="Hvilket land ligger i Europa?" />),
      ).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="Norge" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="true" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="USA" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="false" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Input value="Kina" />)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Form.Checkbox checked="false" />)).toEqual(true);

      wrapper.find(Button.Success).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/quizzes/1/edit');
        done();
      });
    });
  });
});
