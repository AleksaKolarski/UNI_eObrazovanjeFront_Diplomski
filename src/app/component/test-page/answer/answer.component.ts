import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { LocationService } from 'src/app/service/location.service';
import { Point } from 'src/app/model/point';

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
              private el: ElementRef) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe( (point: Point) =>{
      // check if point is inside of this component
      let rect = this.el.nativeElement.getBoundingClientRect();
      if(point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom){
        this.active = true;
      }
      else{
        this.active = false;
      }
      this.locationService.activeAnswerState.set(this.answer.id, this.active);
    });
  }

  // Set red border around answer
  setActiveBorder(){
    return {'class-answer-active': this.active && this.debugOn};
  }
}
