// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import userService from '../user-service';

class Login extends Component {
  username = '';
  password = '';

  render() {
    return (
      <Card title="Login">
        <Column width={3}>
          <Form.Input
            id={'username'}
            value={this.username}
            type="text"
            placeholder="Username"
            onChange={(event) => {
              this.username = event.currentTarget.value;
            }}
          />
          <Form.Input
            id={'password'}
            value={this.password}
            type="password"
            placeholder="Password"
            onChange={(event) => {
              this.password = event.currentTarget.value;
            }}
          />
          <br />
          <Button.Success
            onClick={() => {
              userService.login(this.username, this.password);
            }}
          >
            Login
          </Button.Success>
          <br />
          Don't have a user? Register <a href="#/register">here</a>!
        </Column>
      </Card>
    );
  }
}

export default Login;
