import { Injectable } from '@angular/core';
import { Point } from '../model/point';
import { Subject } from 'rxjs';
import { Log } from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /*
  ** U slucaju da se crvena tacka nalazi u odgovoru i ako se u sledecem frejmu nadje van pitanja
  ** onda se u logu moze desiti da se prvo zabelezi izlazak iz pitanja pa tek onda iz odgovora.
  */

  /*
  ** Servis koristi mape za aktivna pitanja i odgovore kako bi mogao da detektuje slucajeve kada 
  ** nijedno pitanje/odgovor nije aktivno. Verovatno postoji bolje/brze resenje.  
  */


  currentLocation: Subject<Point>;
  activeQuestionState: Map<number, Boolean>;
  activeAnswerState: Map<number, Boolean>;
  currentQuestionId: number;
  currentAnswerId: number;
  log: Log[];


  constructor() {
    this.activeQuestionState = new Map<number, Boolean>();
    this.activeAnswerState = new Map<number, Boolean>();
    this.currentLocation = new Subject<Point>();
    this.log = [];
  }


  setActiveQuestionState(id: number, active: Boolean){
    this.activeQuestionState.set(id, active);

    // Check if any question is active
    let anyQuestionActive = false;
    this.activeQuestionState.forEach((value: Boolean, key: number) => {
      if (value == true) {
        anyQuestionActive = true;
        if (key != this.currentQuestionId) {
          this.setQuestionId(key);
        }
        return;
      }
    });
    if (anyQuestionActive == false) {
      if (this.currentQuestionId != -1) {
        this.setQuestionId(-1);
      }
    }
  }

  setActiveAnswerState(id: number, active: Boolean){
    this.activeAnswerState.set(id, active);
    
    // Check if any answer is active
    let anyAnswerActive = false;
    this.activeAnswerState.forEach((value: Boolean, key: number) => {
      if (value == true) {
        anyAnswerActive = true;
        if (key != this.currentAnswerId) {
          this.setAnswerId(key);
        }
        return;
      }
    });
    if (anyAnswerActive == false) {
      if (this.currentAnswerId != -1) {
        this.setAnswerId(-1);
      }
    }
  }

  setCurrentLocation(point: Point) {
    this.currentLocation.next(point);
  }

  setQuestionId(id: number) {
    this.currentQuestionId = id;
    console.log('Question: ' + id);
    this.addLogEntry(id, 'question');
  }

  setAnswerId(id: number){
    this.currentAnswerId = id;
    console.log('Answer: ' + id);
    this.addLogEntry(id, 'answer');
  }

  addLogEntry(id: number, type: string) {
    this.log.push(new Log(type, 0, id, new Date()));
  }
}
