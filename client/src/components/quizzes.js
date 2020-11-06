// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Component for viewing all quizzes
 * TODO:
 *  - Search function (minimum category)
 */ 
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

/** 
 * Component for getting details of a spesific quiz
 * TODO:
 *  - Make it look better
 *    - Example: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
 */ 
export class QuizDetail extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: ''};
  questions: QuizQuestion[] = [];
  
  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
        {this.questions.map((question) => (
          <Card>
            <Row key={question.questionId}>
              <Column width={10}>
                <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.quiz_question_id}>{question.question}</NavLink>
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
      .get(this.props.match.params.quizId)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quizId)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
  }
}

/**
 * Component for editing quiz
 * TODO:
 *  - Copy QuizDetails once done
 *  - Delete quiz not working
 *  - Add question
 */
export class QuizEdit extends Component<{ match: { params: { quiz_id: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: ''};
  questions: QuizQuestion[] = [];
  
  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
        {this.questions.map((question) => (
          <Card>
            <Row key={question.questionId}>
              <Column width={10}>
                <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.question_id}>{question.question}</NavLink>
              </Column>
            </Row>
          </Card>
        ))}
          <Column width={0.5}><Button.Danger onClick={(event) => 
            quizService
              .delete(this.quiz.quiz_id)
              .then(() =>  history.push('/quizzes'))
              .catch((error: Error) => Alert.danger('Error deleting task: ' + error.message))
          }>Delete quiz</Button.Danger></Column>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .get(this.props.match.params.quizId)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quizId)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
  }
}

/**
 * Component for getting details of questions
 * TODO:
 *  - this.props.match.params.quizQuestionId is undefined. 
 */
export class QuestionDetail extends Component<{ match: { params: { quizQuestionId: number } } }> {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: ''};
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption = { quizQuestionOptionId: 0, quizQuestionId: 0, questionAnswer: '', isCorrect: true};

  render() {
    return (
      <>
        <Card title={this.question.question}>
        {this.questionOption.map((questionAnswer) => (
          <Card>
            <Row key={questionOption.quizQuestionOptionId}>
              <Column width={10}>
                {this.questionOption.questionAnswer}
              </Column>
            </Row>
          </Card>
        ))}
        <Card title='Correct Answer'>
          {this.questionOptionCorrect.questionAnswer}
        </Card>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getQuestion(this.props.match.params.quizQuestionId)
      .then((question) => this.question = question)
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.match.params.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.match.params.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) => Alert.danger('Error getting correct question option: ' + error.message));
  }

}

/**
 * Component for editing questions
 * TODO: 
 *  - Copy QuestionDetails once done
 *  - Delete question
 *  - Edit question options
 *  */
class QuestionEdit extends Component { }


/**
 * Component for playing quizzes
 * TODO:
 *  - Everything
 */
class QuizPlay extends Component { }