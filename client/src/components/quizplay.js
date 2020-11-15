import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';



const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Component for playing quizzes
 * TODO:
 *  - Everything
 */
export class QuizPlay extends Component {}