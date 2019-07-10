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
    this.locationService.currentLocation.subscribe( (point: Point) =>{
      
      // UZIMA SE POGRESNI (parent) ELEMENT I ZATO JE SELEKTOVANA I OKOLINA ELEMENTA
      let rect = this.el.nativeElement.getBoundingClientRect();
      if(point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom){
        this.active = true;
      }
      else{
        this.active = false;
      }
      this.locationService.activeQuestionState.set(this.question.id, this.active);
    });
  }

  setActiveBorder(){
    return {'class-question-active': this.active && this.debugOn};
  }
}
