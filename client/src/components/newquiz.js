// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';

//Component for creating new quizzes

class NewQuiz extends Component {
    title = '';

    render() {
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
                  value={this.title}
                  onChange={(event) => (this.title = event.currentTarget.value)}
                />
              </Column>
            </Row>
            <Row>
              <Column width={2}>
                <Form.Label>Category:</Form.Label>
              </Column>
              <Column>
               Nedtreksboks med alle categoryene her, når man lager quizen går man til en side for create questions:
              </Column>
            </Row>
          </Card>
          <Button.Success
            onClick={() => {
              taskService
                .create(this.title, this.category)
                .then((id) => history.push('/newQuiz/quizQuestions'))
                .catch((error: Error) => Alert.danger('Error creating quiz: ' + error.message));
            }}
          >
            Create quiz
          </Button.Success>
        </>
      );
    }
  }

export default NewQuiz;