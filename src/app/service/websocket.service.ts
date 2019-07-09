import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable, BehaviorSubject, PartialObserver } from 'rxjs';
import { RxStompState } from '@stomp/rx-stomp';
import { IMessage } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private path = '/topic/gazepoint-data';

  connectionState$: BehaviorSubject<RxStompState>;
  watchObservable: Observable<IMessage>;

  constructor(private rxStompService: RxStompService) {
    this.connectionState$ = rxStompService.connectionState$
    this.watch(this.path);
  }


  activate(){
    this.rxStompService.activate();
  }

  deactivate(){
    this.rxStompService.deactivate();
  }
  
  watch(path: string){
    this.watchObservable = this.rxStompService.watch(path);
  }

  subscribe(next){
    this.watchObservable.subscribe(next);
  }
}
