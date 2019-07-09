import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  
  @Input()
  debugOn: Boolean;

  active: Boolean;

  
  constructor() { }

  ngOnInit() {
    this.active = true;
  }

  setActiveBorder(){
    return {'class-question-active': this.active && this.debugOn};
  }
}
