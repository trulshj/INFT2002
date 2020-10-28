// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, { type Quiz, type Category } from '../quiz-service';

class Quizzes extends Component {
  categories: Category[] = [];
  render() {
    return (
      <>
        <Card title="Quizzes">
          {this.categories.map((category) => (
            <Row key={category.categoryname}>
              <Column>
                <NavLink to={'/quizzes/' + category.categoryname}>{category.categoryname}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getAllcategories()
      .then((categories) => (this.categories = this.categories))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
  }
}

export default Quizzes;
