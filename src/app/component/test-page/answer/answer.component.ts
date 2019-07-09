import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer;

  @Input()
  question: Question;

  @Input()
  debugOn: Boolean;

  active: Boolean;


  constructor() { }

  ngOnInit() {
    this.active = true;
  }

  // Set red border around answer
  setActiveBorder(){
    return {'class-answer-active': this.active && this.debugOn};
  }
}
