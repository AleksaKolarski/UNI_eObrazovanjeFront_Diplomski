import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';
import { RxStompState } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { GazepointMessage } from 'src/app/model/gazepoint-message';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Point } from 'src/app/model/point';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {

  username:string;
  questions:Question[];
  point: Point;
  pointStyle: any;
  debugOn: Boolean;
  connectionStatus: RxStompState;
  rxStompStates = RxStompState;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private websocketService: WebsocketService) { }

  ngOnInit() {

    this.debugOn = true;
    this.point = <Point>{};

    // uzimamo username iz url-a
    this.routeSubscription = this.route.params.subscribe(params => {
      this.username = params['username'];
    });

    // ucitavamo pitanja
    this.questionService.getAll().subscribe(data => {
      this.questions = data;
    });

    this.websocketService.connectionState$.subscribe(state => {
      this.connectionStatus = state;
    });

    this.websocketService.subscribe((message: Message) => {
      let messageObject = JSON.parse(message.body);
      this.point.x = messageObject.fpogx * window.screen.width;
      this.point.y = messageObject.fpogy * window.screen.height;
      this.setPointStyle();
      if( ! messageObject.connectionActive){
        console.log('Server sent disconnect message.');
        this.websocketService.deactivate();
      }
    });
  }

  setPointStyle(){
    return { 'left.px': (this.point.x - 5), 'top.px': (this.point.y - 5)};
  }

  onButtonConnectClick(){
    this.websocketService.activate();
  }

  onButtonDisconnectClick(){
    this.websocketService.deactivate();
  }

  setConnectionStatusClass(){
    return {
      'class-connection-status-connecting': this.connectionStatus==RxStompState.CONNECTING,
      'class-connection-status-open': this.connectionStatus==RxStompState.OPEN,
      'class-connection-status-closing': this.connectionStatus==RxStompState.CLOSING,
      'class-connection-status-closed': this.connectionStatus==RxStompState.CLOSED
    };
  }

  ngOnDestroy() {
    // cistimo
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
  }

  onDebugChanged(){
    console.log(this.debugOn);
  }

  onClickKraj(){
    console.log("click");
  }
}
