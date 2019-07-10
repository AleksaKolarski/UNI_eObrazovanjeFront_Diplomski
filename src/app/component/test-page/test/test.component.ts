import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';
import { RxStompState } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { WebsocketService } from 'src/app/service/websocket.service';
import { Point } from 'src/app/model/point';
import { LocationService } from 'src/app/service/location.service';
import { Result } from 'src/app/model/result';
import { ResultService } from 'src/app/service/result.service';
import { ChooseAnswerService } from 'src/app/service/choose-answer.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  username:string;
  questions:Question[];
  point: Point;
  debugOn: Boolean;
  connectionStatus: RxStompState;
  rxStompStates = RxStompState;


  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private resultService: ResultService,
              private websocketService: WebsocketService,
              private locationService: LocationService,
              private chooseAnswerService: ChooseAnswerService) { }

  ngOnInit() {
    this.debugOn = false;
    this.point = <Point>{};

    // extract username from url
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });

    // load questions
    this.questionService.getAll().subscribe(data => {
      this.questions = data;
      this.chooseAnswerService.init(this.questions);
    });

    // listening for websocket connection state change
    this.websocketService.connectionState$.subscribe(state => {
      this.connectionStatus = state;
    });

    // receiving messages from websocket connection
    this.websocketService.subscribe((message: Message) => {
      let messageObject = JSON.parse(message.body);
      this.point.x = messageObject.fpogx * window.screen.width;
      this.point.y = messageObject.fpogy * window.screen.height;
      if( ! messageObject.connectionActive){
        console.log('Server sent disconnect message.');
        this.websocketService.deactivate();
      }

      // set current eye coordinates in locationService
      this.locationService.setCurrentLocation(this.point);
    });
  }


  /** 
  * Returns style object to position Red Dot on received coordinates.
  */
  setPointStyle(){
    return { 'left.px': (this.point.x - 5), 'top.px': (this.point.y - 5)};
  }

  onButtonConnectClick(){
    this.websocketService.activate();
  }

  onButtonDisconnectClick(){
    this.websocketService.deactivate();
  }

  /**
   * Returns style object to color websocket indicator dot based on current 
   * connection status.
   */
  setConnectionStatusClass(){
    return {['class-connection-status-' + RxStompState[this.connectionStatus]]: true};
  }

  /** 
  * Checks if all questions are answered. If they are, test results 
  * and log are sent to server.
  * Runs on button press.
  */
  onClickEnd(){
    
    // check if all questions are answered
    if( ! this.chooseAnswerService.check()){
      console.log('Questions not answered!');
      return;
    }

    // create result object
    let result: Result = <Result>{};
    result.name = this.username;
    result.log = this.locationService.log;
    result.answers = this.chooseAnswerService.questionAnswerPairs;

    // send result to server
    this.resultService.create(result).subscribe(data => {
      // todo
    });
  }
}
