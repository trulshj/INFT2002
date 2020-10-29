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
    console.log('yoyoyo', this.category);
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
            console.log(this.quizName, this.category);
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
        console.log('??????????', categories);
        this.category = categories[0].category_name;
      })
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
  }
}
//Component for creating new questions for quizzes
export class NewQuizQuestions extends Component<{ match: { params: { id: number } } }> {
  quizquestion: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  quizquestionoption: QuizQuestionOption = {
    quizQuestionOptionId: 0,
    quizQuestionId: 0,
    questionAnswer1: '',
    questionAnswer2: '',
    questionAnswer3: '',
    isCorrect1: false,
    isCorrect2: false,
    isCorrect3: false,
  };

  render() {
    return (
      <>
        <Card title="Create Questions">
          <Row>
            <Column width={1}>
              <Form.Label>Question</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizquestion.question}
                onChange={(event) => (this.quizquestion.question = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={1}>
              <Form.Label>Option 1</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer1 = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect1}
                onChange={(event) =>
                  (this.quizquestionoption.isCorrect1 = event.currentTarget.checked)
                }
              />
            </Column>
          </Row>
          <Row>
            <Column width={1}>
              <Form.Label>Option 2</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer2 = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect2}
                onChange={(event) =>
                  (this.quizquestionoption.isCorrect2 = event.currentTarget.checked)
                }
              />
            </Column>
          </Row>
          <Row>
            <Column width={1}>
              <Form.Label>Option 3</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.quizquestionoption.questionAnswer}
                onChange={(event) =>
                  (this.quizquestionoption.questionAnswer3 = event.currentTarget.value)
                }
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.quizquestionoption.isCorrect3}
                onChange={(event) =>
                  (this.quizquestionoption.isCorrect3 = event.currentTarget.checked)
                }
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
