import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Question } from 'src/app/model/question';
import { LocationService } from 'src/app/service/location.service';
import { Point } from 'src/app/model/point';

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

  
  constructor(private locationService: LocationService,
              private el: ElementRef) { }

  ngOnInit() {
    // listen for coordinate change
    this.locationService.currentLocation.subscribe( (point: Point) =>{
      let rect = this.el.nativeElement.firstElementChild.getBoundingClientRect();
      this.active = (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom);
      this.locationService.setActiveQuestionState(this.question.id, this.active);
    });
  }


  /**
   * Returns style object that colors border red/transparent based on active and debug state.
   */
  setActiveBorder(){
    return {'class-question-active': this.active && this.debugOn};
  }
}
