import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { LocationService } from 'src/app/service/location.service';
import { Point } from 'src/app/model/point';
import { ChooseAnswerService } from 'src/app/service/choose-answer.service';

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


  constructor(private locationService: LocationService,
              private el: ElementRef,
              private chooseAnswerService: ChooseAnswerService) { }

  ngOnInit() {
    // listen for coordinate change
    this.locationService.currentLocation.subscribe( (point: Point) =>{
      let rect = this.el.nativeElement.firstElementChild.getBoundingClientRect();
      this.active = (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom);
      this.locationService.setActiveAnswerState(this.answer.id, this.active);
    });
  }
  

  /**
   * Returns style object that colors border red/transparent based on active and debug state.
   */
  setActiveBorder(){
    return {'class-answer-active': this.active && this.debugOn};
  }

  /**
   * On radio button click sets current answer for its question.
   */
  onClick(){
    this.chooseAnswerService.setAnswer(this.question.id, this.answer.id);
  }
}
