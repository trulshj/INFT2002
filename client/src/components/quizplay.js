// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import playService from '../play-service';
import { createHashHistory } from 'history';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const history = createHashHistory();

export class QuizPlay extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '', rating: 0 };
  // question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questions: QuizQuestion[] = [];
  // Is the quiz finished?
  quizFinished = false;
  // Points you get in the quiz
  points: number = 0;
  // Star rating
  rating = 0;

  render() {
    return (
      <>
        <Row>
          <Column width={5}>
            <h3>Questions:</h3>
          </Column>
          <Column width={5}>{this.quizFinished ? <h3>Answers:</h3> : null}</Column>
        </Row>
        {this.questions.map((question) => (
          <Row key={question.quiz_question_id}>
            <Column width={5}>
              <PlayOptions quizQuestionId={question.quiz_question_id} />
            </Column>
            <Column width={5}>
              {this.quizFinished ? (
                <PlayOptionAnswer quizQuestionId={question.quiz_question_id} />
              ) : null}
            </Column>
          </Row>
        ))}
        {!this.quizFinished ? (
          <Button.Success
            id="buttonFinishQuiz"
            onClick={() => {
              this.points = 0;
              if (!this.quizFinished) {
                this.quizFinished = true;
              }

              this.points = playService.checkAnswers();
            }}
          >
            Submit Answer
          </Button.Success>
        ) : (
          <Card>
            <h2>{`You got ${this.points} points!`}</h2>
          </Card>
        )}
        {this.quizFinished ? (
          <Card title="Rate quiz">
            <ReactStars
              id="ratingStars"
              size={24}
              value={this.rating}
              onChange={(newRating) => {
                this.rating = newRating;
                quizService
                  .createRating(this.rating, this.props.match.params.quizId)
                  .catch((error: Error) => Alert.danger('Error creating rating: ' + error.message));
              }}
            ></ReactStars>
          </Card>
        ) : null}
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
  question: QuizQuestion = { quiz_question_id: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];

  render() {
    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card key={option.quiz_question_option_id}>
              <Row>
                <Column width={10}>{option.question_answer}</Column>
                <Form.Checkbox
                  id={option.quiz_question_option_id}
                  onChange={(event) => {
                    event.currentTarget.checked = event.currentTarget.checked;

                    playService.setAnswer(
                      this.props.quizQuestionId,
                      (event.currentTarget.id + 2) % 3,
                      event.currentTarget.checked,
                    );
                  }}
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

    setTimeout(() => {
      const id = this.question.quiz_question_id;
      let corr = [];
      for (const q of this.questionOption) {
        if (q.quiz_question_id == id) {
          corr.push(q.is_correct);
        }
      }
      const ans = { questionId: id, givenAnswers: [false, false, false], correctAnswers: corr };
      playService.addQuestionAnswers(ans);
    }, 100);
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
            <Card key={option.quiz_question_option_id}>
              <Row>
                <Column width={10}>{option.question_answer}</Column>
                <Form.Checkbox checked={option.is_correct} readOnly={true} />
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
