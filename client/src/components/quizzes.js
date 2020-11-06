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

<<<<<<< HEAD
//To do: implementere søkefunksjon.
=======
/**
 * Component for viewing all quizzes
 * TODO:
 *  - Search function (minimum category)
 */
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
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
<<<<<<< HEAD
                  <Button.Success
                    onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/edit')}
                  >
                    Edit
                  </Button.Success>
=======
                  <Button.Light onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/edit')}>
                    Edit
                  </Button.Light>
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
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

<<<<<<< HEAD
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
=======
/**
 * Component for getting details of a spesific quiz
 * TODO:
 *  - Make it look better
 *    - Example: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
 */
/**
 * {this.questionsDetails.map((questionDetails) => (
                 <Column>{questionDetail.is_correct}</Column>
                ))}
 */

export class QuizDetail extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];
<<<<<<< HEAD
  questionsDetails: Question[] = [];
=======
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5

  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
          {this.questions.map((question) => (
            <Card>
<<<<<<< HEAD
              <Row key={question.questionId}>
=======
              <Row key={question.quizQuestionId}>
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
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

<<<<<<< HEAD
=======
/**
 * Component for editing quiz
 * TODO:
 *  - Copy QuizDetails once done
 *  - Delete quiz not working
 *  - Add question
 */
export class QuizEdit extends Component<{ match: { params: { quizId: number } } }> {}

>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
/**
 * Component for getting details of questions
 * TODO:
<<<<<<< HEAD
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
=======
 *  - Multiple correct answers or no?.
 */
export class QuestionDetail extends Component<{ match: { params: { quizQuestionId: number } } }> {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];

  render() {
    console.log(this.questionOption);
    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card>
              <Row key={option.quizQuestionOptionId}>
                <Column width={10}>{option.question_answer}</Column>
              </Row>
            </Card>
          ))}
          <Card title="Correct Answer(s)">
            {this.questionOptionCorrect.map((option) => (
              <Card>
                <Row key={option.quizQuestionOptionId}>
                  <Column width={10}>{option.question_answer}</Column>
                </Row>
              </Card>
            ))}
          </Card>
        </Card>
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
      </>
    );
  }

  mounted() {
    console.log('Heeeeer', this.props);

    quizService
<<<<<<< HEAD
      .getQuestion(this.props.match.params.quizId, this.props.match.params.questionId)
      .then((questionsDetails) => (this.questionsDetails = questionsDetails))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
  }
}
=======
      .getQuestion(this.props.match.params.quizQuestionId)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.match.params.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.match.params.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) =>
        Alert.danger('Error getting correct question option: ' + error.message),
      );
  }
}

/**
 * Component for editing questions
 * TODO:
 *  - Copy QuestionDetails once done
 *  - Delete question
 *  - Edit question options
 *  */
export class QuestionEdit extends Component {}

/**
 * Component for playing quizzes
 * TODO:
 *  - Everything
 */
export class QuizPlay extends Component {}
>>>>>>> a377c75580d46357c7f800ac2213b1f8a02f96b5
