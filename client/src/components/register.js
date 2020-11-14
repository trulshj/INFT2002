// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import userService from '../user-service';

class Register extends Component {
  username = '';
  password = '';
  passwordMatch = false;

  render() {
    return (
      <Card title="Enter your username and password">
        <Row>
          <Column width={3}>
            {/* $FlowExpectedError */}
            <Form.Input
              value={this.username}
              type="text"
              placeholder="Username"
              onChange={(event) => {
                this.username = event.currentTarget.value;
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column width={3}>
            {/* $FlowExpectedError */}
            <Form.Input
              value={this.password}
              type="password"
              placeholder="Password"
              onChange={(event) => {
                this.password = event.currentTarget.value;
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column width={3}>
            {/* $FlowExpectedError */}
            <Form.Input
              type="password"
              placeholder="Confirm Password"
              onChange={(event) => {
                this.passwordMatch = event.currentTarget.value == this.password ? true : false;
                console.log(this.passwordMatch);
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column width={4}>
            {'At least one capital letter?' + (/[A-ZÆØÅ]+/.test(this.password) ? '✔️' : '❌')}
            <br />
            {'At least one number?' + (/[0-9]+/.test(this.password) ? '✔️' : '❌')}
            <br />
            {'At least 8 characters?' + (this.password.length >= 8 ? '✔️' : '❌')}
            <br />
            {'Do passwords match?' + (this.passwordMatch ? '✔️' : '❌')}
          </Column>
        </Row>
        <Row>
          <Column width={2}>
            <Button.Success
              onClick={() => {
                if (
                  this.passwordMatch &&
                  /[A-ZÆØÅ]+/.test(this.password) &&
                  /[0-9]+/.test(this.password) &&
                  this.password.length >= 8
                ) {
                  userService.register(this.username, this.password);
                } else {
                  Alert.danger('Password criteria not satisfied');
                }
              }}
            >
              Create user
            </Button.Success>
          </Column>
        </Row>
      </Card>
    );
  }
}

export default Register;
