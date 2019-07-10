import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable, BehaviorSubject, PartialObserver } from 'rxjs';
import { RxStompState, RxStompConfig } from '@stomp/rx-stomp';
import { IMessage } from '@stomp/stompjs';
import { myRxStompConfig } from '../my-rx-stomp.config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private path = '/topic/gazepoint-data';

  connectionState$: BehaviorSubject<RxStompState>;
  watchObservable: Observable<IMessage>;

  constructor(private rxStompService: RxStompService) {
    this.connectionState$ = rxStompService.connectionState$
    this.watchObservable = this.rxStompService.watch(this.path);
    this.rxStompService.configure(myRxStompConfig);
  }


  activate(){
    this.rxStompService.activate();
  }

  deactivate(){
    this.rxStompService.deactivate();
  }

  subscribe(next){
    this.watchObservable.subscribe(next);
  }
}
