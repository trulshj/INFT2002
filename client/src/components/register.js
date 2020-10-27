// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';

class Register extends Component {
  username = '';
  password = '';

  render() {
    return (
      <Card title="Enter your username and password">
        <Row>
          <Column width={3}>
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
          <Column>
            <Button.Success
              onClick={() => {
                Alert.danger('Not yet implemented');
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