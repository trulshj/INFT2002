// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, {
  type Quiz,
  type Category,
  type QuizQuestion,
  type Question,
  type QuestionDetails,
} from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

//To do: implementere søkefunksjon.
export class Quizzes extends Component {
  quizzes: Quiz[] = [];

  render() {
    console.log(this.quizzes);
    return (
      <>
        <Card title="Quizzes">
          <Column>Search:</Column>
          {this.quizzes.map((quiz) => (
            <Card>
              <Row key={quiz.quizId}>
                <Column width={10}>
                  {quiz.quiz_category}
                  {' - '}
                  <NavLink to={'/quizzes/' + quiz.quiz_id}>
                    {quiz.quiz_name + ' - Se fasit'}
                  </NavLink>
                </Column>
                <Column width={1.5}>
                  <Button.Success
                    onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/play')}
                  >
                    Start Quiz
                  </Button.Success>
                </Column>
                <Column width={0.5}>
                  <Button.Success
                    onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/edit')}
                  >
                    Edit
                  </Button.Success>
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
      .getAll()
      .then((quizzes) => (this.quizzes = quizzes))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
  }
}

//Play Component To DO
class QuizPlay extends Component {}

/**
 * Work in progress
TODO:
- Edit question part / question details part
  - Delete question part
- Fix delete quiz (internal server error 500)
 - Copy changes from quizdetails once quizdetails is done.
 */
export class QuizEdit extends Component<{ match: { params: { quiz_id: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];

  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
          {this.questions.map((question) => (
            <Card>
              <Row key={question.questionId}>
                <Column width={10}>
                  <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.question_id}>
                    {question.question}
                  </NavLink>
                </Column>
              </Row>
            </Card>
          ))}
          <Column width={0.5}>
            <Button.Danger
              onClick={(event) =>
                quizService
                  .delete(this.quiz.quiz_id)
                  .then(() => history.push('/quizzes'))
                  .catch((error: Error) => Alert.danger('Error deleting task: ' + error.message))
              }
            >
              Delete quiz
            </Button.Danger>
          </Column>
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
/* TO DO Se eksempel på hvordan Componenten kan se ut her: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
Work in progress
TODO:
- Make it look better
 */
/**
 * {this.questionsDetails.map((questionDetails) => (
                 <Column>{questionDetail.is_correct}</Column>
                ))}
 */

export class QuizDetail extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];
  questionsDetails: Question[] = [];

  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
          {this.questions.map((question) => (
            <Card>
              <Row key={question.questionId}>
                <Column width={10}>
                  <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.quiz_question_id}>
                    {question.question}
                  </NavLink>
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
      .getQuestion(this.props.match.params.quizId, this.props.match.params.questionId)
      .then((questionsDetails) => (this.questionsDetails = questionsDetails))
      .catch((error: Error) =>
        Alert.danger('Error getting questions and options: ' + error.message),
      );
  }
}

/**
 * TODO:
 *  - this.props.match.params.quizQuestionId is undefined.
 *  - Edit quiz question part
 *  - Delete quiz question part
 */
export class QuestionDetail extends Component<{
  match: { params: { questionId: number, quizId: number } },
}> {
  questionsDetails: QuestionDetails = {
    options: [],
    question: '',
    questionId: this.props.match.params.questionId,
    quizId: this.props.match.params.quizId,
  };

  render() {
    console.log('denne', this.questionsDetails);

    return (
      <>
        <Card title="Fasit"></Card>
        {this.questionsDetails.options.map((option) => (
          <Card key={option.optionId}>
            <Row>
              <Column width={10}>{option.questionOption}</Column>
              <Column width={10}>{option.isCorrect && 'correct'}</Column>
            </Row>
          </Card>
        ))}
      </>
    );
  }

  mounted() {
    console.log('Heeeeer', this.props);

    quizService
      .getQuestion(this.props.match.params.quizId, this.props.match.params.questionId)
      .then((questionsDetails) => (this.questionsDetails = questionsDetails))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
  }
}
