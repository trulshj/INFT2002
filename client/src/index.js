// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Row, Column, Form, Button } from './widgets';
import Login from './components/login';
import NewQuiz from './components/newquiz';
import Quizzes from './components/quizzes';
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
        <Route exact path="/newQuiz" component={NewQuiz} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </HashRouter>,
    root,
  );
