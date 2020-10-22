// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
// import { components } from './quiz-components';

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

class Quizzes extends Component {
  render() {
    return <Card title="Quizzez">Here be no quizzes yet!</Card>;
  }
}

class NewQuiz extends Component {
  render() {
    return <Card title="New quiz">Not yet implemented</Card>;
  }
}

class Login extends Component {
  render() {
    return <Card title="Login">Not yet implemented</Card>;
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
      </div>
    </HashRouter>,
    root
  );
