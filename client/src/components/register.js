// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import history from '../history';
import userService from '../user-service';

class Register extends Component {
  username = '';
  password = '';
  passwordMatch = false;

  render() {
    return (
      <Card title="Register">
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
          {/* $FlowExpectedError[prop-missing] */}
          <Form.Input
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => {
              this.passwordMatch = event.currentTarget.value == this.password ? true : false;
              console.log(this.passwordMatch);
            }}
          />
        </Column>
        <br />
        <Column width={4}>
          {'At least one capital letter?' + (/[A-ZÆØÅ]+/.test(this.password) ? '✔️' : '❌')}
          <br />
          {'At least one number?' + (/[0-9]+/.test(this.password) ? '✔️' : '❌')}
          <br />
          {'At least 8 characters?' + (this.password.length >= 8 ? '✔️' : '❌')}
          <br />
          {'Do passwords match?' + (this.passwordMatch ? '✔️' : '❌')}
        </Column>
        <br />
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

                // Janky way of waiting for the server
                let i = 0;
                let interval = setInterval(() => {
                  if (userService.user != '') {
                    clearInterval(interval);
                    history.push('/profile');
                  }
                  if (i > 5) {
                    clearInterval(interval);
                  }
                  i++;
                }, 16);
              } else {
                Alert.danger('Password criteria not satisfied');
              }
            }}
          >
            Create user
          </Button.Success>
        </Column>
      </Card>
    );
  }
}

export default Register;
