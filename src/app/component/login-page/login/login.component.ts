import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onStart(){
    this._router.navigate(['test', { username: this.username }]);
  }
}
