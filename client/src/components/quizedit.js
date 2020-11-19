import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert, Row, Column, Form, Button, NavBar } from '../widgets';
import quizService, { type Quiz, type Category, type QuizQuestion } from '../quiz-service';
import { createHashHistory, Route } from 'history';
import { NavLink } from 'react-router-dom';

const history = createHashHistory(); // Use history.push(...) to programmatically change path

/**
 * Component for editing quiz
 * TODO:
 */

export class QuizEdit extends Component<{ match: { params: { quizId: number } } }> {
  quiz: Quiz = { quizId: 0, quizName: '', quizCategory: '' };
  questions: QuizQuestion[] = [];
  categories: Category[] = [];

  render() {
    //console.log(this.quiz);
    return (
      <>
        <Card>
          <Card>
            <Row>
              <Column width={1}>Edit Quiz title:</Column>
              <Column width={4}>
                <Form.Input
                  id="quizTitle"
                  type="text"
                  value={this.quiz.quiz_name}
                  onChange={(event) => (this.quiz.quiz_name = event.currentTarget.value)}
                />
              </Column>
              <Column>
                <Form.Select
                  id="categoryValue"
                  onChange={(event) => (this.quiz.quiz_category = event.currentTarget.value)}
                  value={this.quiz.quiz_category}
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
            </Row>
          </Card>
          {this.questions.map((question) => (
            <Card key={question.quiz_question_id}>
              <Row>
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
          <Button.Light
            onClick={() =>
              quizService
                .updateQuiz(this.quiz)
                .then(() => history.push('/quizzes'))
                .catch((error: Error) => Alert.danger('Error updating quiz: ' + error.message))
            }
          >
            Save changes
          </Button.Light>
          <Button.Danger
            onClick={() => {
              this.questions.map((question) =>
                quizService
                  .deleteOption(question.quiz_question_id)
                  .catch((error: Error) =>
                    Alert.danger('Error deleting options for questions for quiz'),
                  ),
              );
              quizService
                .deleteQuizQuestions(this.quiz.quiz_id)
                .catch((error: Error) =>
                  Alert.danger('Error deleting questions for quiz: ' + error.message),
                );
              quizService
                .deleteRating(this.quiz.quiz_id)
                .catch((error: Error) => Alert.danger('Error deleting ratings for quiz'));
              quizService
                .deleteQuiz(this.quiz.quiz_id)
                .then(() => history.push('/quizzes'))
                .catch((error: Error) => Alert.danger('Error deleting quiz: ' + error.message));
            }}
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
    quizService
      .getAllcategories()
      .then((categories) => {
        this.categories = categories;
      })
      .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));
  }
}

/**
 * Component for editing questions
 * TODO:
 *  */

export class QuestionEdit extends Component<{ match: { params: { quizQuestionId: number } } }> {
  question: QuizQuestion = { quizQuestionId: 0, quizId: 0, question: '' };
  questionOption: QuizQuestionOption[] = [];

  render() {
    //(this.question);
    //console.log(this.questionOption);
    return (
      <>
        <Card>
          <Card>
            <Row>
              <Column width={1}>Edit Question title:</Column>
              <Column width={4}>
                <Form.Input
                  id="questionTitle"
                  type="text"
                  value={this.question.question}
                  onChange={(event) => (this.question.question = event.currentTarget.value)}
                />
              </Column>
            </Row>
          </Card>
          {this.questionOption.map((option) => (
            <Card key={option.quiz_question_option_id}>
              <Row>
                <Column width={4}>
                  <Form.Input
                    id="optionAnswer"
                    type="text"
                    value={option.question_answer}
                    onChange={(event) => (option.question_answer = event.currentTarget.value)}
                  />
                </Column>
                <Column>
                  <Form.Checkbox
                    id="optionCheckbox"
                    checked={option.is_correct}
                    onChange={(event) => (option.is_correct = event.currentTarget.checked)}
                  />{' '}
                  <Form.Label>Correct answer</Form.Label>
                </Column>
                <Column>
                  <Button.Success
                    id="optionUpdateButton"
                    onClick={() =>
                      quizService
                        .updateOption(option)
                        //.then(() => console.log(option))
                        .catch((error: Error) => Alert.danger('Error editing option: ' + error))
                    }
                  >
                    Save
                  </Button.Success>
                </Column>
              </Row>
            </Card>
          ))}
        </Card>
        <Card>
          <Button.Light
            onClick={() =>
              quizService
                .updateQuestion(this.question)
                .then(() => history.push('/quizzes/' + this.question.quiz_id + '/edit'))
                .catch((error: Error) => Alert.danger('Error updating question: ' + error.message))
            }
          >
            Save changes
          </Button.Light>
          <Button.Danger
            onClick={() => {
              quizService
                .deleteOption(this.question.quiz_question_id)
                .catch((error: Error) =>
                  Alert.danger('Error deleting options for questions for quiz'),
                );
              quizService
                .deleteQuestion(this.question.quiz_question_id)
                .then(() => history.push('/quizzes/' + this.question.quiz_id + '/edit'))
                .catch((error: Error) => Alert.danger('Error deleting question: ' + error.message));
            }}
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
                id="question_id"
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
                id="option1"
                type="text"
                value={this.option1}
                onChange={(event) => (this.option1 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                id="isCorrect1"
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
                id="option2"
                type="text"
                value={this.option2}
                onChange={(event) => (this.option2 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                id="isCorrect2"
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
                id="option3"
                type="text"
                value={this.option3}
                onChange={(event) => (this.option3 = event.currentTarget.value)}
              />
            </Column>
            <Column>
              <Form.Checkbox
                id="isCorrect3"
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
