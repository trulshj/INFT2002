// @flow

import * as React from 'react';
import { TaskList, TaskNew, TaskDetails, TaskEdit } from '../src/task-components';
import { type Task } from '../src/task-service';
import { shallow } from 'enzyme';
import { Form, Button, Column } from '../src/widgets';
import { NavLink } from 'react-router-dom';

jest.mock('../src/task-service', () => {
  class TaskService {
    getAll() {
      return Promise.resolve([
        { id: 1, title: 'Les leksjon', description: 'Side 1', done: false },
        { id: 2, title: 'Møt opp på forelesning', description: 'Rom 1001', done: false },
        { id: 3, title: 'Gjør øving', description: 'Oppgave 6', done: false },
      ]);
    }

    create(title: string, description: string) {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }

    get(id: number) {
      return Promise.resolve({ id: 1, title: 'Les leksjon', description: 'Side 1', done: false });
    }

    update(task: Task) {
      return Promise.resolve();
    }

    delete(id: number) {
      return Promise.resolve();
    }
  }
  return new TaskService();
});

describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });

  test('TaskDetails draws correctly with MatchingElement', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper.containsMatchingElement(<Column>Les leksjon</Column>)).toEqual(true);
      expect(wrapper.containsMatchingElement(<Column>Side 1</Column>)).toEqual(true);
      done();
    });
  });

  test('TaskDetails draws correctly with Snapshot', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  test('TaskList sets TaskNew location correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    wrapper.find(Button.Success).simulate('click');

    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/new');
      done();
    });
  });

  test('TaskDetails sets TaskEdit location correctly', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    wrapper.find(Button.Success).simulate('click');

    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/1/edit');
      done();
    });
  });

  test('TaskEdit draws correctly', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'test' } });

    // Wait for events to complete
    setTimeout(() => {
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="test" />));
      done();
    });
  });
});
