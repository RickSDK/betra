import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/user';
import { BaseComponent } from '../../base/base.component';

declare var $: any;

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  public submitDisabled:boolean = true;

  constructor() { super(); }

  loginPressed() {
    console.log('loginPressed');

    var email:string = $('#email').val();
    var password:string = $('#password').val();

    localStorage['email'] = email;
    localStorage['code'] = btoa(password);
    var params = {
      email: email,
      code: localStorage['code'],
      action: 'login'
    };
    this.executeApi('login.php', params, true);


  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    localStorage['user_id'] = responseJson.user.user_id;
    localStorage['User'] = JSON.stringify(responseJson.user);
    var userTemp = new User(responseJson.user);
    console.log('hey! notifications!!!', userTemp.notifications);
    localStorage['notifications'] = userTemp.notifications;
    this.messageEvent.emit('login');
  }

  valueChanged() {
    var email:string = $('#email').val();
    var password:string = $('#password').val();

    this.submitDisabled = !email || !password;
  }
  cancelPressed() {
    this.messageEvent.emit('cancel');
  }
}
