// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category } from '../quiz-service';
import { createHashHistory } from 'history';
import { NavLink } from 'react-router-dom';

class Quizzes extends Component {
  quizzes: Quiz[] = [];
  
  render() {
    return (
      <>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.quizId}>
              <Column>
                <NavLink to={'/quizzes/' + quiz.quizId}>{quiz.quizName + quiz.quizCategory}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Success onClick={() => history.push('/quizzes/play')}>Start Quiz</Button.Success>
      </>
    );
  }

  mounted() {
    quizService
      .getAll()
      .then((quizzes) => (this.quizzes = this.quizzes))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
  }
}

export default Quizzes;
