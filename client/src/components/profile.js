// @flow

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import userService from '../user-service';

class Profile extends Component {
  render() {
    if (userService.user == '') {
      return (
        <Card>
          You're not logged in at the moment ✋
          <br />
          Do you want to <a href="#/login">log in</a>? 👈
        </Card>
      );
    }
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
