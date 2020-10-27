// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, { type Quiz } from '../quiz-service';

//Component for creating new quizzes

class NewQuiz extends Component {
  quizname = '';

  render() {
    return (
      <>
        <Card quizname="New Quiz">
          <Row>
            <Column width={2}>
              <Form.Label>Quiz Name:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizname}
                onChange={(event) => (this.quizname = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Quiz quizcategory:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizcategory}
                onChange={(event) => (this.quizcategory = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Category:</Form.Label>
            </Column>
            <Column>
              Nedtreksboks med alle categoryene her, når man lager quizen går man til en side for
              create questions: value=this.quizcategory
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            quizService
              .create(this.quizname, this.quizcategory)
              .then((id) => history.push('/newQuiz/quizQuestions'))
              .catch((error: Error) => Alert.danger('Error creating quiz: ' + error.message));
          }}
        >
          Create quiz
        </Button.Success>
      </>
    );
  }

export default NewQuiz;
