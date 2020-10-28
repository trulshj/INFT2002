// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, { type Category } from '../quiz-service';
import Dropdown from 'react-dropdown'



//Component for creating new quizzes

class NewQuiz extends Component {
  quizName = '';
  categorys: Category[] = [];
 
  
  

  

  render() {
    const options = [
      'one', 'two', 'three'
    ]
    const defaultOption = options[0]


    
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
              <Form.Label>Quiz quizcategory:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.quizCategory}
                onChange={(event) => (this.quizCategory = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Category:</Form.Label>
            </Column>
            <Column>
            <select>{this.categorys.map(category => (<options key={category} value={category}>{category}</options>))}</select>
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            quizService
              .create(this.quizName, this.category)
              .then((quizId) => history.push('/newQuiz/quizQuestions'))
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
      .getAll()
      .then((categorys) => (this.categorys = categorys))
      .catch((error: Error) => Alert.danger('Error getting tasks: ' + error.message));
  }
}

export default NewQuiz;
