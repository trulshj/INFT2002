// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

//To do: implementere søkefunksjon. 
export class Quizzes extends Component {
  quizzes: Quiz[] = [];
  
  render() {
    console.log(this.quizzes)
    return (
      <>
        <Card title="Quizzes">
        <Column>Search:</Column>
          {this.quizzes.map((quiz) => (
            <Card>
            <Row key={quiz.quizId}>
              <Column width={10}>
              {quiz.quiz_category}{" - "}<NavLink to={'/quizzes/' + quiz.quiz_id}>{quiz.quiz_name + " - Se fasit"}</NavLink>
              </Column>
              <Column width={1.5}><Button.Success onClick={() => history.push('/quizzes/play')}>Start Quiz</Button.Success></Column>
              <Column width={0.5}><Button.Success onClick={() => history.push('/quizzes/edit')}>Edit</Button.Success></Column>
              <Column width={0.5}><Button.Success onClick={(event) => 
                quizService.delete(quiz.quiz_id).then(() =>  history.push('/')).then(alert("You deleted quiz with id:" + quiz.quiz_id))
                
              } 
            >
              Delete</Button.Success></Column>
            </Row>
            </Card>
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




//Play Component To DO
class QuizPlay extends Component { }



// Quiz Edit Component TO DO
class QuizEdit extends Component { }

// TO DO Se eksempel på hvordan Componenten kan se ut her: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
export class QuizDetail extends Component<{ match: { params: { id: number } } }> {

  details: QuestionAndOption[] = [];

  render() {
    return (
      <>
    
        <Card title={"this.quiz.quiz_name"}>
          <Row>
            <Column>{"Quiz_question"}</Column>
          </Row>
        </Card>
        <Card title={"this.quiz.quiz_name"}>
          <Row>
            <Column>{"Quiz_question"}</Column>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getAllDetails()
      .then((details) => (this.details = details))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
  }
}


  
 



/** Ikke fungerende: Slags consept til QuizDetails
 *    {this.quizQuestionOptions.map((quiz) => (
                  <Card>
                  <Row key={quiz.quizId}>
                  <Column width={3}>
                  {quiz.quiz_category}{" - "}<NavLink to={'/quizzes/' + quiz.quiz_id}>{quiz.quiz_name}</NavLink>
                  </Column> 
                  </Row>
                  </Card>
                ))}


                 mounted() {
    quizService
      .getAllQuestions()
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting task: ' + error.message));
  }
 */