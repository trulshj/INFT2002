export type QuestionAnswers = {
  questionId: number,
  givenAnswers: boolean[],
  correctAnswers: boolean[],
};

class PlayService {
  questions: QuestionAnswers[] = [];

  addQuestionAnswers(answers) {
    this.questions.push(answers);
  }

  setAnswer(quiz_question_id, option_id, bool) {
    for (let q of this.questions) {
      if (q.questionId == quiz_question_id) {
        q.givenAnswers[option_id] = bool;
      }
    }
  }

  clearAnswers(): null {
    this.questions = [];
  }

  checkAnswers(): number {
    let points = 0;

    for (const question of this.questions) {
      console.table(question);
      if (question.givenAnswers.length == question.correctAnswers.length) {
        for (let i = 0; i < question.givenAnswers.length; i++) {
          if (question.givenAnswers[i] == true && question.correctAnswers[i] == true) {
            points++;
          } if (question.givenAnswers[i] == true && question.correctAnswers[i] == false) {
            points--;
          }
        }
      }
    }
    // Clear the answers, we don't need em
    this.clearAnswers();
    
    //console.log(points);
    return points;
  }
}

const playService = new PlayService();

export default playService;
