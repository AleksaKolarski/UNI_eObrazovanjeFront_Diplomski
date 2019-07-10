import { Injectable } from '@angular/core';
import { Point } from '../model/point';
import { Subject } from 'rxjs';
import { Log } from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLocation: Subject<Point>;

  activeQuestionState: Map<number, Boolean>;
  activeAnswerState: Map<number, Boolean>;

  currentQuestionId: number;
  currentAnswerId: number;
  questionId: Subject<number>;
  answerId: Subject<number>;

  log: Log[];


  constructor() {
    this.activeQuestionState = new Map<number, Boolean>();
    this.activeAnswerState = new Map<number, Boolean>();
    this.currentLocation = new Subject<Point>();
    this.questionId = new Subject<number>();
    this.answerId = new Subject<number>();

    this.questionId.subscribe((id: number) => {
      this.currentQuestionId = id;
      console.log('Question: ' + id);
    });
    this.answerId.subscribe((id: number) => {
      this.currentAnswerId = id;
      console.log('Answer: ' + id);
    });
  }

  setCurrentLocation(point: Point){
    this.currentLocation.next(point);

    // Check if any question is active
    let anyQuestionActive = false;
    this.activeQuestionState.forEach((value: Boolean, key: number) => {
      if(value == true){
        anyQuestionActive = true;
        if(key != this.currentQuestionId){
          this.setQuestionId(key);
        }
        return;
      }
    });
    if(anyQuestionActive == false){
      if(this.currentQuestionId != -1){
        this.setQuestionId(-1);
      }
    }

    // Check if any answer is active
    let anyAnswerActive = false;
    this.activeAnswerState.forEach((value: Boolean, key: number) => {
      if(value == true){
        anyAnswerActive = true;
        if(key != this.currentAnswerId){
          this.setAnswerId(key);
        }
        return;
      }
    });
    if(anyAnswerActive == false){
      if(this.currentAnswerId != -1){
        this.setAnswerId(-1);
      }
    }
  }

  setQuestionId(id: number){
    this.questionId.next(id);
  }

  setAnswerId(id: number){
    this.answerId.next(id);
  }
  
  addLogEntry(id: number, type: string){

  }
}
