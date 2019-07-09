import { Injectable } from '@angular/core';
import { Point } from '../model/point';
import { Observable, Subject} from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private point$: Observable<Point>;

  constructor() {
    this.point$ = new Observable<Point>((observer => {
      const {next, error} = observer;
      let watchId;
    }));
  }

  setPoint(newX: number, newY: number){
    //this.point.map( point => ({...point, x: newX, y: newY}));
    this.point$.pipe(
      map(point => ({...point, x: newX, y: newY})),
      tap(point => console.log(point))
    );
  }

  getPoint$(): Observable<Point>{
    return this.point$;
  }
}
