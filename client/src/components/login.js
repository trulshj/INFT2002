// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import history from '../history';
import userService from '../user-service';

class Login extends Component {
  username = '';
  password = '';
  message = '';

  render() {
    // If we're already logged in jsut redirect to profile
    if (userService.user != '') {
      history.push('/profile');
    }
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

              // Janky way of waiting for the server
              let i = 0;
              let interval = setInterval(() => {
                if (userService.user != '') {
                  clearInterval(interval);
                  history.push('/profile');
                }
                if (i > 5) {
                  clearInterval(interval);
                  this.message = '❌ Wrong password or username';
                }
                i++;
              }, 16);
            }}
          >
            Login
          </Button.Success>
          {this.message}
          <br />
          Don't have a user? Register <a href="#/register">here</a>!
        </Column>
      </Card>
    );
  }
}

export default Login;
