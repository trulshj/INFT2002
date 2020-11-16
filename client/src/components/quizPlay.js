// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

export class QuizPlay extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questions: QuizQuestion[] = [];

  render() {
    return (
      <>
        {this.questions.map((question) => (
          <Row key={question.quizQuestionId}>
            <Column width={5}>
              <PlayOptions quizQuestionId={question.quiz_question_id} />
            </Column>
          </Row>
        ))}
        <Button.Success>Done</Button.Success>
        <Card title="Rate quiz">
          <ReactStars
            id="ratingStars"
            size={24}
            value={this.rating}
            onChange={(newRating) => {
              this.rating = newRating;
              quizService
                .createRating(this.rating, this.props.match.params.quizId)
                .then(alert(this.rating + ' ' + this.props.match.params.quizId))
                .catch((error: Error) => Alert.danger('Error creating rating: ' + error.message));
            }}
          ></ReactStars>
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

export class PlayOptions extends Component {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];
  questionAnswers: QuizQuestionOption[] = [];

  render() {
    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card>
              <Row key={option.quizQuestionOptionId}>
                <Column width={10}>{option.question_answer}</Column>
                <Form.Checkbox
                  id="questionChecked"
                  checked={this.question_answer}
                  onChange={(event) => (this.question_answer = event.currentTarget.checked)}
                />
              </Row>
            </Card>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getQuestion(this.props.quizQuestionId)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) =>
        Alert.danger('Error getting correct question option: ' + error.message),
      );
  }
}

export class PlayOptionAnswer extends Component {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];

  render() {

    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card>
              <Row key={option.quizQuestionOptionId}>
                <Column width={10}>{option.question_answer}</Column>
                <Form.Checkbox
                  checked={option.is_correct}
                  onChange={(event) => (option.is_correct = event.currentTarget.checked)}
                />
              </Row>
            </Card>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getQuestion(this.props.quizQuestionId)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) =>
        Alert.danger('Error getting correct question option: ' + error.message),
      );
  }
}
