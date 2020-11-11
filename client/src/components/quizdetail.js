import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';



const history = createHashHistory(); // Use history.push(...) to programmatically change path


/**
 * Component for getting details of a spesific quiz
 * 
 */
export class QuizDetail extends Component<{ match: { params: { quizId: number } } }> {
    quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
    questions: QuizQuestion[] = [];
  
    render() {
      console.log(this.quiz);
      return (
        <>
          <Card title={this.quiz.quiz_name}>
            {this.questions.map((question) => (
              <Card>
                <Row key={question.quizQuestionId}>
                  <Column width={10}>
                    <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.quiz_question_id}>
                      {question.question}
                    </NavLink>
                  </Column>
                </Row>
              </Card>
            ))}
          </Card>
          <Card title="Rate quiz">
          <StarRating onChange={() => {
            quizService
              .createRating(this.props.rating, this.props.match.params.quizId)
              .then(alert(this.props.rating, this.props.match.params.quizId))
              .catch((error: Error) => Alert.danger('Error creating rating: ' + error.message));
          }}
        ></StarRating>
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
 */
export class QuestionDetail extends Component<{ match: { params: { quizQuestionId: number } } }> {
    question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
    questionOption: QuizQuestionOption[] = [];
    questionOptionCorrect: QuizQuestionOption[] = [];
  
    render() {
      console.log(this.question);
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
        </>
      );
    }
  
    mounted() {
      quizService
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
  