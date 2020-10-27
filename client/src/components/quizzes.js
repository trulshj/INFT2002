// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button } from '../widgets';
import quizService, { type Quiz } from '../quiz-service';

class Quizzes extends Component {
    categorys: Category[] = [];
    render() {
        return (
          <>
            <Card title="Quizzes">
              {this.categorys.map((category) => (
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
          .getAllCategorys()
          .then((categorys) => (this.categorys = this.categorys))
          .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
      }
}

export default Quizzes;