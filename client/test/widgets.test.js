// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../src/widgets';
import { NavLink } from 'react-router-dom';

//Tests for widgets

//Test for alert

describe('Alert tests', () => {
    test('No alerts initially', () => {
      const wrapper = shallow(<Alert />);
  
      expect(wrapper.matchesElement(<></>)).toEqual(true);
    });
  
    test('Show alert message', (done) => {
      const wrapper = shallow(<Alert />);
  
      Alert.danger('test');
  
      // Wait for events to complete
      setTimeout(() => {
        expect(
          wrapper.matchesElement(
            <>
              <div>
                test<button>×</button>
              </div>
            </>
          )
        ).toEqual(true);
  
        done();
      });
    });
  
    test('Close alert message', (done) => {
      const wrapper = shallow(<Alert />);
  
      Alert.danger('test');
  
      // Wait for events to complete
      setTimeout(() => {
        expect(
          wrapper.matchesElement(
            <>
              <div>
                test<button>×</button>
              </div>
            </>
          )
        ).toEqual(true);
  
        wrapper.find('button.close').simulate('click');
  
        expect(wrapper.matchesElement(<></>)).toEqual(true);
  
        done();
      });
    });
  });

//Test for NavBarLink
describe('NavLink widget tests', () => {
    test('NavLink widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<NavBar type="text">Text</NavBar>);
  
      expect(
        wrapper.containsMatchingElement(
          <NavBar className="nav-link" activeClassName="active" to={''}></NavBar>
        )
      );
    });
  });
  
  //Test for NavBar
  describe('NavBar widget tests', () => {
    test('NavBar widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<NavBar type="text">Text</NavBar>);
  
      expect(
        wrapper.containsMatchingElement(
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
            {<NavLink className="navbar-brand" activeClassName="active" exact to=""></NavLink>}
          </nav>
        )
      );
    });
  });
  
  //Test for Row
  describe('Row widget tests', () => {
    test('Row widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Row></Row>);
  
      expect(wrapper.containsMatchingElement(<div className="row"></div>));
    });
  });
  
  //Test for Form.Input
  describe('Form.Input widget tests', () => {
    test('Form.Input widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Form.Input type="text"></Form.Input>);
  
      expect(wrapper.containsMatchingElement(<input type="text"></input>));
    });
  });
  
  //Test for Form.Label
  describe('Form.Label widget tests', () => {
    test('Form.Label widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Form.Label>Text</Form.Label>);
  
      expect(wrapper.containsMatchingElement(<Form.Label>Text</Form.Label>));
    });
  });
  
  //Test for Form.Textarea
  describe('Form.Textarea widget tests', () => {
    test('Form.Textarea widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Form.Textarea value>Text</Form.Textarea>);
  
      expect(wrapper.containsMatchingElement(<textarea className="form-control">Text</textarea>));
    });
  });
  
  //Test for Form.Textarea
  describe('Form.Checkbox widget tests', () => {
    test('Form.Checkbox widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Form.Checkbox type="checkbox"></Form.Checkbox>);
  
      expect(wrapper.containsMatchingElement(<input type="true"></input>));
    });
  });
  
  //Test for Form.Select
  describe('Form.Select widget tests', () => {
    test('Form.Select widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Form.Select value></Form.Select>);
  
      expect(wrapper.containsMatchingElement(<select className="custom-select">Text</select>));
    });
  });
  
  //Test for card
  describe('Card widget test', () => {
    test('Card widget draws correctly', () => {
      const wrapper = shallow(<Card title="Title">Text</Card>);
  
      expect(wrapper.containsMatchingElement(<h5>Title</h5>)).toEqual(true);
      expect(wrapper.containsMatchingElement(<div>Text</div>)).toEqual(true);
    });
  });
  
  //Test for column
  describe('Column widget test', () => {
    test('Column widget draws correctly', () => {
      const wrapper = shallow(<Column>Text</Column>);
  
      expect(wrapper.containsMatchingElement(<div>Text</div>)).toEqual(true);
    });
  
    test('Column widget draws correctly with width property set', () => {
      const wrapper = shallow(<Column width={2}>Text</Column>);
  
      expect(wrapper.containsMatchingElement(<div className="col-2">Text</div>)).toEqual(true);
    });
  
    test('Column widget draws correctly with right property set', () => {
      const wrapper = shallow(<Column right>Text</Column>);
  
      expect(wrapper.containsMatchingElement(<div className="col text-right">Text</div>)).toEqual(true);
    });
  });
  
  //Test for button
  describe('Button.Light widget tests', () => {
    test('Button.Light widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Light>Text</Button.Light>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-light">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Light widget draws correctly with small property set', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Light small>Text</Button.Light>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-light btn-sm py-0">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Light test onClick property', () => {
      let buttonClicked = false;
      const wrapper = shallow(
        <div>
          <Button.Light onClick={() => (buttonClicked = true)}>Text</Button.Light>
          <Button.Danger onClick={() => {}}>Text</Button.Danger>
        </div>
      );
  
      expect(buttonClicked).toEqual(false);
      wrapper.find(Button.Light).simulate('click');
      expect(buttonClicked).toEqual(true);
    });
  });
  
  //Test for Button.Success
  describe('Button.Success widget tests', () => {
    test('Button.Success widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Success>Text</Button.Success>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-success">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Success widget draws correctly with small property set', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Success small>Text</Button.Success>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-success btn-sm py-0">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Success test onClick property', () => {
      let buttonClicked = false;
      const wrapper = shallow(
        <div>
          <Button.Success onClick={() => (buttonClicked = true)}>Text</Button.Success>
        </div>
      );
  
      expect(buttonClicked).toEqual(false);
      wrapper.find(Button.Success).simulate('click');
      expect(buttonClicked).toEqual(true);
    });
  });
  
  //Test for Button.Danger
  describe('Button.Danger widget tests', () => {
    test('Button.Danger widget draws correctly', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Danger>Text</Button.Danger>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-danger">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Danger widget draws correctly with small property set', () => {
      // $FlowExpectedError
      const wrapper = shallow(<Button.Danger small>Text</Button.Danger>);
  
      expect(
        wrapper.containsMatchingElement(
          <button type="button" className="btn btn-danger btn-sm py-0">
            Text
          </button>
        )
      ).toEqual(true);
    });
  
    test('Button.Danger test onClick property', () => {
      let buttonClicked = false;
      const wrapper = shallow(
        <div>
          <Button.Danger onClick={() => (buttonClicked = true)}>Text</Button.Danger>
        </div>
      );
  
      expect(buttonClicked).toEqual(false);
      wrapper.find(Button.Danger).simulate('click');
      expect(buttonClicked).toEqual(true);
    });

  //Test for StarRating

    describe('Rating widget test', () => {
        test('Rating widget draws correctly', () => {
          // $FlowExpectedError
          const wrapper = shallow(<StarRating></StarRating>);
      
          expect(
            wrapper.containsMatchingElement(
            )
          ).toEqual(true);
        });
  });
});