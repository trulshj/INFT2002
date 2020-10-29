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
    console.log(this.quizzes)
    return (
      <>
        <Card title="Quizzes">
          {this.quizzes.map((quiz) => (
            <Row key={quiz.quizId}>
              <Column>
              {quiz.quiz_category}{" - "}<NavLink to={'/quizzes/' + quiz.quiz_id}>{quiz.quiz_name}</NavLink>
              </Column>
              <Column><Button.Success onClick={() => history.push('/quizzes/play')}>Start Quiz</Button.Success></Column>
            </Row>
          ))}
        </Card>
        
      </>
    );
  }

  mounted() {
    quizService
      .getAll()
      .then((quizzes) => (this.quizzes = quizzes))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
  }
}

export default Quizzes;
