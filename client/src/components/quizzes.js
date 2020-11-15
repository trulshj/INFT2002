// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar, StarRating } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Component for viewing all quizzes
 */
export class Quizzes extends Component {
  quizzes: Quiz[] = [];
  search = '';
  category = '';
  categories: Category[] = [];
  ratings: Rating[] = [];

  render() {
    return (
      <>
        <Card title="Quizzes">
          <Card>
            <Row>
              <Column width={1}>Search for name:</Column>
              <Column width={2}>
                <Form.Input
                  id="quizNameSearch"
                  type="text"
                  value={this.search}
                  onChange={(event) => (this.search = event.currentTarget.value)}
                />
              </Column>
              <Column width={2}>
                <Button.Success
                  id="buttonQuizNameSearch"
                  onClick={() =>
                    quizService
                      .getQuizzesSearch(this.search)
                      .then((quizzes) => (this.quizzes = quizzes))
                      .catch((error: Error) =>
                        Alert.danger('Error getting quizzes: ' + error.message),
                      )
                  }
                >
                  Search
                </Button.Success>
              </Column>
            </Row>
            <Row>
              <Column width={1}>Search by category: </Column>
              <Column width={2}>
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
              <Column width={2}>
                <Button.Success
                  id="buttonCategorySearch"
                  onClick={() =>
                    quizService
                      .getQuizzesWithCategory(this.category)
                      .then((quizzes) => (this.quizzes = quizzes))
                      .catch((error: Error) =>
                        Alert.danger('Error getting quizzes: ' + error.message),
                      )
                  }
                >
                  Search
                </Button.Success>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button.Light
                  id="buttonClearSearch"
                  onClick={() =>
                    quizService
                      .getAll()
                      .then((quizzes) => (this.quizzes = quizzes))
                      .catch((error: Error) =>
                        Alert.danger('Error getting quizzes: ' + error.message),
                      )
                  }
                >
                  Clear search
                </Button.Light>
              </Column>
            </Row>
          </Card>
          {this.quizzes.map((quiz) => (
            <Card key={quiz.quiz_id}>
              <Row>
                <Column width={4}>
                  {quiz.quiz_category}
                  {' - '}
                  <NavLink to={'/quizzes/' + quiz.quiz_id}>
                    {quiz.quiz_name + ' - Se fasit'}
                  </NavLink>
                </Column>
                <Column width={1.8}></Column>
                <ReactStars size={24} value={quiz.rating} edit={false} isHalf={true} />
                <Column width={5}>{<h3>{quiz.rating}</h3>}</Column>

                <Column width={1.5}>
                  <Button.Success
                    onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/play')}
                  >
                    Start Quiz
                  </Button.Success>
                </Column>
                <Column width={0.5}>
                  <Button.Light onClick={() => history.push('/quizzes/' + quiz.quiz_id + '/edit')}>
                    Edit
                  </Button.Light>
                </Column>
              </Row>
            </Card>
          ))}
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getAll()
      .then((quizzes) => (this.quizzes = quizzes))
      .catch((error: Error) => Alert.danger('Error getting quizzes: ' + error.message));
    quizService
      .getAllcategories()
      .then((categories) => {
        this.categories = categories;
        this.category = categories[0].category_name;
      })
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));
  }
}
