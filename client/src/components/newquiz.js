// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, {
  type Category,
  type QuizQuestionOption,
  type QuizQuestion,
  type Quiz,
} from '../quiz-service';
import Dropdown from 'react-dropdown';
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
            <Column>
              <select
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
              </select>
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
//Component for creating new questions for quizzes
export class NewQuizQuestions extends Component<{ match: { params: { id: number } } }> {
  quizQuestion: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  quizQuestionOption1: QuizQuestionOption1 = {
    quizQuestionOptionId: 0,
    questionAnswer: '',
    isCorrect: false,
  };
  quizQuestionOption2: QuizQuestionOption2 = {
    quizQuestionOptionId: 0,
    questionAnswer: '',
    isCorrect: false,
  };
  quizQuestionOption3: QuizQuestionOption3 = {
    quizQuestionOptionId: 0,
    questionAnswer: '',
    isCorrect: false,
  };

  render() {
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    this.quizQuestion.quizId = lastURLSegment;

    return (
      <>
        <Card title="Create Questions">
          <Row>
            <Column width={2}>
              <Form.Label>Question</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizQuestion.question}
                onChange={(event) => (this.quizQuestion.question = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 1</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizQuestionOption1.questionAnswer}
                onChange={(event) =>
                  (this.quizQuestionOption1.questionAnswer = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizQuestionOption1.isCorrect1}
                onChange={(event) =>
                  (this.quizQuestionOption1.isCorrect = event.currentTarget.checked)
                }
              /><Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 2</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizQuestionOption2.questionAnswer}
                onChange={(event) =>
                  (this.quizQuestionOption2.questionAnswer = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizQuestionOption2.isCorrect}
                onChange={(event) =>
                  (this.quizQuestionOption2.isCorrect = event.currentTarget.checked)
                }
              /><Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 3</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizQuestionOption3.questionAnswer}
                onChange={(event) =>
                  (this.quizQuestionOption3.questionAnswer = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizQuestionOption3.isCorrect}
                onChange={(event) =>
                  (this.quizQuestionOption3.isCorrect = event.currentTarget.checked)
                }
              /><Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
        </Card>
        <Button.Success onClick={() =>{ 
          quizService
.createQuestion(this.quizQuestion.quizId, this.quizQuestion.question)
.then(console.log(this.quizQuestion.quizId, this.quizQuestion.question))
.then(console.log(this.quizQuestion.quizQuestionId, this.quizQuestionOption1.questionAnswer, this.quizQuestionOption1.isCorrect))
.then(console.log(this.quizQuestion.quizQuestionId, this.quizQuestionOption2.questionAnswer, this.quizQuestionOption2.isCorrect))
.then(console.log(this.quizQuestion.quizQuestionId, this.quizQuestionOption3.questionAnswer, this.quizQuestionOption3.isCorrect))
.catch((error: Error) => Alert.danger('Error creating quiz: ' + error.message));} }>Add question</Button.Success>
      </>
    );
  }

  mounted() {}
}

//.createOption(this.quizQuestion.question, this.quizQuestionOption.questionAnswer1, this.quizquestionOption.questionAnswer1)
//.createOption(this.quizQuestion.question, this.quizQuestionOption.questionAnswer2, this.quizquestionOption.questionAnswer2)
//.createOption(this.quizQuestion.question, this.quizQuestionOption.questionAnswer3, this.quizquestionOption.questionAnswer3)
//.then(alert("You added the current information:" + this.quizQuestion.question + this.quizQuestionOption.questionAnswer1 + this.quizQuestionOption.questionAnswer2 + this.quizQuestionOption.questionAnswer3))
//.then((quizId) => this.props.history.push('/newQuiz/' + quizId))