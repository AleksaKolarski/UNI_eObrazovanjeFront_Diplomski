import { Injectable } from '@angular/core';
import { QuestionAnswerPair } from '../model/question-answer-pair';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class ChooseAnswerService {

  questionAnswerPairs: QuestionAnswerPair[];


  constructor() {
    this.questionAnswerPairs = [];
  }


  /**
   * Init questionAnswerPair list with question id-s and -1 for answer id which indicate that no answer was selected.
   */
  init(questions: Question[]){
    questions.forEach(question => {
      this.questionAnswerPairs.push(<QuestionAnswerPair>{ questionId: question.id, answerId: -1});
    });
  }

  /**
   * Sets selected answer id for question
   */
  setAnswer(questionId: number, answerId: number){
    this.questionAnswerPairs.forEach(questionAnswerPair => {
      if(questionAnswerPair.questionId == questionId){
        questionAnswerPair.answerId = answerId;
        return;
      }
    });
  }

  /**
   * Check if all questions are answered. 
   */
  check(): boolean{
    let good: boolean;
    good = true;
    this.questionAnswerPairs.forEach(questionAnswerPair => {
      if(questionAnswerPair.answerId == -1){
        good = false;
        return;
      }
    });
    return good;
  }
}
