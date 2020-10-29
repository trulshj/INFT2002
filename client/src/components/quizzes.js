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
              <Column width={3}>
              {quiz.quiz_category}{" - "}<NavLink to={'/quizzes/' + quiz.quiz_id}>{quiz.quiz_name}</NavLink>
              </Column>
              <Column width={1}><Button.Success onClick={() => history.push('/quizzes/play')}>Start Quiz</Button.Success></Column>
              <Column ><Button.Success onClick={() => history.push('/quizzes/edit')}>Edit</Button.Success></Column>
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

// TO DO Se eksempel på hvordan Componenten kan se ut her: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
class QuizDetails extends Component<{ match: { params: { quiz_id: number } } }> {
  task: Task = { id: 0, quizName: '', done: false };

  render() {
    return (
      <>
        <Card title="Questions">
          <Row>
            <Column width={2}>Quiz Question:</Column>
            <Column>{this.quizQuestion.question}</Column>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    taskService
      .get(this.props.match.params.id)
      .then((task) => (this.task = task))
      .catch((error: Error) => Alert.danger('Error getting task: ' + error.message));
  }
}

//Play Component To DO
class QuizPlay extends Component { }



// Quiz Edit Component TO DO
class QuizEdit extends Component { }


export default Quizzes;
