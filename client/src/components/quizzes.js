// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
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
              <Column width={1.5}><Button.Success onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/play')}>Start Quiz</Button.Success></Column>
              <Column width={0.5}><Button.Success onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/edit')}>Edit</Button.Success></Column>
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



/**
 * TBH Kan QuizEdit heller være / være en del av quizDetails
 * Work in progress
TODO:
- Fix problem with quizId being undefined
- Edit question part / question details part
  - Delete question part
- Move delete quiz to quizDetails
 */
class QuizEdit extends Component<{ match: { params: { quiz_id: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: ''};
  questions: QuizQuestion[] = [];

  render() {
    return (
      <>
        <Card title='{this.quiz.quiz_name}'>
        {this.questions.map((question) => (
          <Card>
            <Row key={question.questionId}>
              <Column width={10}>
                <NavLink to={'/quizzes/' + quiz.quiz_id + '/' + question.question_id}>{question.question}</NavLink>
              </Column>
              <Column width={0.5}><Button.Success onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/' + question.question_id + '/edit')}>Edit question</Button.Success></Column>
            </Row>
          </Card>
        ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .get(this.props.match.params.quiz_id)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quiz_id)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
  }
}
/* TO DO Se eksempel på hvordan Componenten kan se ut her: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
Work in progress
TODO:
- Fix problem with quizId being undefined
- Edit question part / question details part
  - Delete question part
 */
export class QuizDetail extends Component<{ match: { params: { quiz_id: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: ''};
  questions: QuizQuestion[] = [];
  
  render() {
    return (
      <>
        <Card title='{this.quiz.quiz_name}'>
        {this.questions.map((question) => (
          <Card>
            <Row key={question.questionId}>
              <Column width={10}>
                <NavLink to={'/quizzes/' + quiz.quiz_id + '/' + question.question_id}>{question.question}</NavLink>
              </Column>
            </Row>
          </Card>
        ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .get(this.props.match.params.quiz_id)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quiz_id)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
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