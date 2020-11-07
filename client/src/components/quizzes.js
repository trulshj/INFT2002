// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Component for viewing all quizzes
 * TODO:
 */
export class Quizzes extends Component {
  quizzes: Quiz[] = [];
  search = '';
  category = '';
  categories: Category[] = [];

  render() {
    return (
      <>
        <Card title="Quizzes">
          <Card>
            <Row>
              <Column width={1}>Search for name:</Column>
              <Column width={2}>
                <Form.Input
                  type="text"
                  value={this.search}
                  onChange={(event) => (this.search = event.currentTarget.value)}
                />
              </Column>
              <Column width={2}>
                <Button.Success
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
            <Card>
              <Row key={quiz.quizId}>
                <Column width={10}>
                  {quiz.quiz_category}
                  {' - '}
                  <NavLink to={'/quizzes/' + quiz.quiz_id}>
                    {quiz.quiz_name + ' - Se fasit'}
                  </NavLink>
                </Column>
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

/**
 * Component for getting details of a spesific quiz
 * TODO:
 *  - Make it look better
 *    - Example: https://create.kahoot.it/details/happy-halloween-with-mickey-and-friends/7a42a869-b4dc-4954-ae7f-1cc88d8fff25
 *  - List questions in a numerical order
 *    - indexOf or other way to add 1, 2, 3... in front.
 */
export class QuizDetail extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];

  render() {
    console.log(this.quiz);
    return (
      <>
        <Card title={this.quiz.quiz_name}>
          {this.questions.map((question) => (
            <Card>
              <Row key={question.quizQuestionId}>
                <Column width={10}>
                  <NavLink to={'/quizzes/' + question.quiz_id + '/' + question.quiz_question_id}>
                    {question.question}
                  </NavLink>
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
      .get(this.props.match.params.quizId)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quizId)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
  }
}

/**
 * Component for editing quiz
 * TODO:
 *  - Delete quiz not working (Internal server error)
 */
export class QuizEdit extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];

  render() {
    return (
      <>
        <Card title={this.quiz.quiz_name}>
          {this.questions.map((question) => (
            <Card>
              <Row key={question.quizQuestionId}>
                <Column width={10}>
                  <NavLink
                    to={'/quizzes/' + question.quiz_id + '/' + question.quiz_question_id + '/edit'}
                  >
                    {question.question}
                  </NavLink>
                </Column>
              </Row>
            </Card>
          ))}
        </Card>
        <Card>
          <Button.Success
            onClick={() => history.push('/quizzes/' + this.quiz.quiz_id + '/edit/addQuestion')}
          >
            Add question
          </Button.Success>
          <Button.Danger
            onClick={() =>
              quizService
                .deleteQuiz(this.quiz.quiz_id)
                .then(() => history.push('/quizzes'))
                .catch((error: Error) => Alert.danger('Error deleting quiz: ' + error.message))
            }
          >
            Delete quiz
          </Button.Danger>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .get(this.props.match.params.quizId)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
    quizService
      .getAllQuestionsInQuiz(this.props.match.params.quizId)
      .then((quizQuestions) => (this.questions = quizQuestions))
      .catch((error: Error) => Alert.danger('Error getting quiz questions: ' + error.message));
  }
}

/**
 * Component for getting details of questions
 * TODO:
 *  - Look better
 */
export class QuestionDetail extends Component<{ match: { params: { quizQuestionId: number } } }> {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];

  render() {
    console.log(this.question);
    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card>
              <Row key={option.quizQuestionOptionId}>
                <Column width={10}>{option.question_answer}</Column>
              </Row>
            </Card>
          ))}
          <Card title="Correct Answer(s)">
            {this.questionOptionCorrect.map((option) => (
              <Card>
                <Row key={option.quizQuestionOptionId}>
                  <Column width={10}>{option.question_answer}</Column>
                </Row>
              </Card>
            ))}
          </Card>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getQuestion(this.props.match.params.quizQuestionId)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.match.params.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.match.params.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) =>
        Alert.danger('Error getting correct question option: ' + error.message),
      );
  }
}

/**
 * Component for editing questions
 * TODO:
 *  - Delete question (Internal server error)
 *  - Edit question options (and name?)
 *  */
export class QuestionEdit extends Component<{ match: { params: { quizQuestionId: number } } }> {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];
  questionOptionCorrect: QuizQuestionOption[] = [];

  render() {
    console.log(this.questionOption);
    return (
      <>
        <Card title={this.question.question}>
          {this.questionOption.map((option) => (
            <Card>
              <Row key={option.quizQuestionOptionId}>
                <Column width={10}>{option.question_answer}</Column>
              </Row>
            </Card>
          ))}
          <Card title="Correct Answer(s)">
            {this.questionOptionCorrect.map((option) => (
              <Card>
                <Row key={option.quizQuestionOptionId}>
                  <Column width={10}>{option.question_answer}</Column>
                </Row>
              </Card>
            ))}
          </Card>
        </Card>
        <Card>
          <Button.Danger
            onClick={() =>
              quizService
                .deleteQuestion(this.question.quiz_question_id)
                .then(() => history.push('/quizzes/' + this.question.quiz_id))
                .catch((error: Error) => Alert.danger('Error deleting question: ' + error.message))
            }
          >
            Delete question
          </Button.Danger>
        </Card>
      </>
    );
  }

  mounted() {
    quizService
      .getQuestion(this.props.match.params.quizQuestionId)
      .then((question) => (this.question = question))
      .catch((error: Error) => Alert.danger('Error getting question: ' + error.message));
    quizService
      .getQuestionOption(this.props.match.params.quizQuestionId)
      .then((questionOption) => (this.questionOption = questionOption))
      .catch((error: Error) => Alert.danger('Error getting question options: ' + error.message));
    quizService
      .getQuestionOptionCorrect(this.props.match.params.quizQuestionId)
      .then((questionOptionCorrect) => (this.questionOptionCorrect = questionOptionCorrect))
      .catch((error: Error) =>
        Alert.danger('Error getting correct question option: ' + error.message),
      );
  }
}

/**
 * Component for adding new questions to existing quizzes
 * TODO:
 */
export class QuizAddQuestion extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: 'test', quizCategory: '' };
  question = '';
  option1 = '';
  isCorrect1 = false;
  option2 = '';
  isCorrect2 = false;
  option3 = '';
  isCorrect3 = false;

  render() {
    return (
      <>
        <Card title="Create Questions for quiz: ">
          {this.quiz.quiz_name}
          <Row>
            <Column width={2}>
              <Form.Label>Question</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.question}
                onChange={(event) => (this.question = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 1</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.option1}
                onChange={(event) => (this.option1 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect1}
                onChange={(event) => (this.isCorrect1 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 2</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.option2}
                onChange={(event) => (this.option2 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect2}
                onChange={(event) => (this.isCorrect2 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Option 3</Form.Label>
            </Column>
            <Column width={4}>
              <Form.Input
                type="text"
                value={this.option3}
                onChange={(event) => (this.option3 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                checked={this.isCorrect3}
                onChange={(event) => (this.isCorrect3 = event.currentTarget.checked)}
              />
              <Form.Label>Correct answer</Form.Label>
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            quizService
              .createQuestion(
                this.quiz.quiz_id,
                this.question,
                this.option1,
                this.isCorrect1,
                this.option2,
                this.isCorrect2,
                this.option3,
                this.isCorrect3,
              )
              .then(
                alert('Tnx for creating Question. ' + this.question + '. Go ahead and add more!'),
              )
              .then(history.push('/quizzes/' + this.quiz.quiz_id + '/edit'))
              .catch((error: Error) => Alert.danger('Error creating question: ' + error.message));
            (this.question = ''),
              (this.option1 = ''),
              (this.isCorrect1 = false),
              (this.option2 = ''),
              (this.isCorrect2 = false),
              (this.option3 = ''),
              (this.isCorrect3 = false);
          }}
        >
          Add question
        </Button.Success>
      </>
    );
  }

  mounted() {
    quizService
      .get(this.props.match.params.quizId)
      .then((quiz) => (this.quiz = quiz))
      .catch((error: Error) => Alert.danger('Error getting quiz: ' + error.message));
  }
}

/**
 * Component for playing quizzes
 * TODO:
 *  - Everything
 */
export class QuizPlay extends Component {}
