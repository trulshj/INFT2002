// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, {type Category, type QuizQuestionOption, type QuizQuestion, type Quiz} from '../quiz-service';
import { HashRouter, Route } from 'react-router-dom';

//Component for creating new quizzes
export class NewQuiz extends Component {
  quizName = '';
  categories: Category[] = [];
  category = '';

  render() {
    return (
      <>
        <Card title="New Quiz">
          <Row>
            <Column width={2}>
              <Form.Label>Quiz Name:</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
              id="quizName"
                type="text"
                value={this.quizName}
                onChange={(event) => (this.quizName = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Category:</Form.Label>
            </Column>
            <Column width={4}>
            <Form.Select
              id="categoryValue"
              onChange={(event) => (this.category = event.currentTarget.value)}
              value={this.category}
              >
              {this.categories.map((category) => (
              <option
              key={category.category_name}
              value={category.category_name}
              placeholder="Select an option"
              >
              {category.category_name}
              </option>
              ))}
            </Form.Select>
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            quizService
              .create(this.quizName, this.category)
              .then((quizId) => this.props.history.push('/newQuiz/' + quizId))
              .catch((error: Error) => Alert.danger('Error creating quiz: ' + error.message));
          }}
        >
          Create quiz
        </Button.Success>
      </>
    );
  }
  mounted() {
    quizService
      .getAllcategories()
      .then((categories) => {
        this.categories = categories;
        this.category = categories[0].category_name;
      })
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
  }
}

//Component for creating new questions with options for quizzes
export class NewQuizQuestions extends Component {
  question = '';
  option1 = '';
  isCorrect1 = false;
  option2 = '';
  isCorrect2 = false;
  option3 = '';
  isCorrect3 = false;

  render() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    var quizId = lastURLSegment;
    var quizQuestionId = 0;

    return (
      <>
        <Card title="Create Questions">
          <Row>
            <Column width={2}>
              <Form.Label>Question</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                id = "question_id"
                type="text"
                value={this.question}
                onChange={(event) => (this.question = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 1</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                id = "option1"
                type="text"
                value={this.option1}
                onChange={(event) => (this.option1 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect1}
                onChange={(event) => (this.isCorrect1 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 2</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
              id = "option2"
                type="text"
                value={this.option2}
                onChange={(event) => (this.option2 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect2}
                onChange={(event) => (this.isCorrect2 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 3</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
              id = "option3"
                type="text"
                value={this.option3}
                onChange={(event) => (this.option3 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect3}
                onChange={(event) => (this.isCorrect3 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            quizService
              .createQuestion(
                quizId,
                this.question,
                this.option1,
                this.isCorrect1,
                this.option2,
                this.isCorrect2,
                this.option3,
                this.isCorrect3,
              ).then(alert("Thanks for creating the following question: " + this.question + ". Go ahead and add more!"))
              .then(this.question = '',
              this.option1 = '',
              this.isCorrect1 = false,
              this.option2 = '',
              this.isCorrect2 = false,
              this.option3 = '',
              this.isCorrect3 = false,)
              .catch((error: Error) => Alert.danger('Error creating question: ' + error.message));
                this.question = '',
                this.option1 = '',
                this.isCorrect1 = false,
                this.option2 = '',
                this.isCorrect2 = false,
                this.option3 = '',
                this.isCorrect3 = false;
          }}
        >
          Add question
        </Button.Success>
      </>
    );
  }
}
