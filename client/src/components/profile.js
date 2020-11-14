// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import userService from '../user-service';

class Profile extends Component {
  username = '';
  password = '';

  render() {
    return (
      <Card title="Profile">
        <Row>
          <Column>Logged in as {userService.user}</Column>
        </Row>
      </Card>
    );
  }
}

export default Profile;
