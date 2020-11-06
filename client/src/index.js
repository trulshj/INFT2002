// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Form, Button } from './widgets';
import Login from './components/login';
import { NewQuiz, NewQuizQuestions } from './components/newquiz';
import { Quizzes, QuizDetail, QuizEdit, QuestionDetail, QuestionEdit } from './components/quizzes';
import Register from './components/register';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Quiz App">
        <NavBar.Link to="/quizzes">Quizzes</NavBar.Link>
        <NavBar.Link to="/newQuiz">New Quiz</NavBar.Link>
        <NavBar.Link to="/login">Login</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Quiz App for Quizzes</Card>;
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/quizzes" component={Quizzes} />
        <Route exact path="/quizzes/:quizId(\d+)" component={QuizDetail} />
        <Route exact path="/quizzes/:quizId(\d+)/edit" component={QuizEdit} />
        <Route exact path="/quizzes/:quizId(\d+)/edit/addQuestion" />
        <Route exact path="/quizzes/:quizId(\d+)/:quizQuestionId(\d+)" component={QuestionDetail} />
        <Route
          exact
          path="/quizzes/:quizId(\d+)/:quizQuestionId(\d+)/edit"
          component={QuestionEdit}
        />
        <Route exact path="/newQuiz" component={NewQuiz} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/newQuiz/:id(\d+)" component={NewQuizQuestions} />{' '}
        {/* id must be number */}
      </div>
    </HashRouter>,
    root,
  );
