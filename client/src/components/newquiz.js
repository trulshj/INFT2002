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

//Component for creating new quizzes
export class NewQuiz extends Component {
  quizName = '';
  categories: Category[] = [];

  render() {
    console.log(this.categories.category_name);
    return (
      <>
        <Card title="New Quiz">
          <Row>
            <Column width={2}>
              <Form.Label>Quiz Name:</Form.Label>
            </Column>
            <Column>
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
              <select id="categoryValue">
                {this.categories.map((category) => (
                  <option
                    key={category}
                    value={this.category}
                    onChange={(event) =>
                      (this.category = event.currentTarget.value) + console.log('Hei')
                    }
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
            console.log(this.quizName);
            quizService

              .create(this.quizName, this.category)
              .then((quizId) => history.push('/newQuiz/' + quizId))
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
      .then((categories) => (this.categories = categories))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
  }
}

export default NewQuiz;

//Component for creating new questions for quizzes
export class NewQuizQuestions extends Component<{ match: { params: { id: number } } }> {
  quizquestion: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  quizquestionoption: QuizQuestionOption = {
    quizQuestionOptionId: 0,
    quizQuestionId: 0,
    questionAnswer: '',
    isCorrect: false,
  };

  render() {
    return (
      <>
        <Card title="Create Questions">
          <Row>
            <Column width={2}>
              <Form.Label>Question:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizquestion.question}
                onChange={(event) => (this.quizquestion.question = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 1</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer = event.currentTarget.value)
                }
              />
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect}
                onChange={() => {}}
                disabled
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 2</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer = event.currentTarget.value)
                }
              />
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect}
                onChange={() => {}}
                disabled
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 3</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer = event.currentTarget.value)
                }
              />
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect}
                onChange={() => {}}
                disabled
              />
            </Column>
          </Row>
        </Card>
        <Button.Success onClick={() => history.push('/quizzes')}>Save</Button.Success>
      </>
    );
  }

  mounted() {}
}
