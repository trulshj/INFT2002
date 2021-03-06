// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';

// Quiz Components
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Form, Button } from './widgets';
import { NewQuiz, NewQuizQuestions } from './components/newquiz';
import { QuizPlay } from './components/quizplay';
import { Quizzes } from './components/quizzes';
import { QuizEdit, QuestionEdit, QuizAddQuestion } from './components/quizedit';
import { QuizDetail, QuestionDetail } from './components/quizdetail';

// User Components
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import userService from './user-service';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Quiz App">
        <NavBar.Link to="/quizzes">Quizzes</NavBar.Link>
        <NavBar.Link to="/newQuiz">New Quiz</NavBar.Link>
        <NavBar.Link to="/profile">Profile</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Quiz App for Quizzes!</Card>;
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
        <Route exact path="/quizzes/:quizId(\d+)/play" component={QuizPlay} />
        <Route exact path="/quizzes/:quizId(\d+)" component={QuizDetail} />
        <Route exact path="/quizzes/:quizId(\d+)/edit" component={QuizEdit} />
        <Route exact path="/quizzes/:quizId(\d+)/edit/addQuestion" component={QuizAddQuestion} />
        <Route exact path="/quizzes/:quizId(\d+)/:quizQuestionId(\d+)" component={QuestionDetail} />
        <Route
          exact
          path="/quizzes/:quizId(\d+)/:quizQuestionId(\d+)/edit"
          component={QuestionEdit}
        />
        <Route exact path="/newQuiz" component={NewQuiz} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/newQuiz/:id(\d+)" component={NewQuizQuestions} />{' '}
        {/* id must be number */}
      </div>
    </HashRouter>,
    root,
  );
