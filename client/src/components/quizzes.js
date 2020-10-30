// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category } from '../quiz-service';
import { createHashHistory } from 'history';
import { NavLink } from 'react-router-dom';

export class Quizzes extends Component {
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
        <Column>Search:</Column>
        
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




//Play Component To DO
class QuizPlay extends Component { }



// Quiz Edit Component TO DO
class QuizEdit extends Component { }

// TO DO Se eksempel på hvordan Componenten kan se ut her: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
export class QuizDetail extends Component<{ match: { params: { id: number } } }> {


  render() {
    return (
      <>
       {this.quizQuestionOptions.map((question_id) => (
                  <Card>
                  <Row key={quiz.quizId}>
                  <Column width={3}>
                  {quiz.quiz_category}{" - "}<NavLink to={'/quizzes/' + quiz.quiz_id}>{quiz.quiz_name}</NavLink>
                  </Column> 
                  </Row>
                  </Card>
                ))}
        <Card title={"this.quiz.quiz_name"}>
          <Row>
            <Column width={2}>Question:</Column>
            <Column>{"Quiz_question"}</Column>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getAllQuestions()
      .then((task) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting task: ' + error.message));
  }
}


export default Quizzes;
