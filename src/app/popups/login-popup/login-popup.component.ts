import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/user';
import { BaseComponent } from '../../base/base.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, SocialAuthService, SocialUser } from 'angularx-social-login';

declare var $: any;

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends BaseComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  public submitDisabled: boolean = true;
  public showLoginButtonFlg: boolean = true;

  constructor(private socialAuthService: SocialAuthService) { super(); }

  override ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if(!this.showLoginButtonFlg)
           this.facebookToBetraLogin(user);
    });
  }

  facebookSignin(): void {
    this.showLoginButtonFlg = false;
    this.loadingFlg = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  facebookToBetraLogin(user:any) {
    console.log('here is my user!', user);

    localStorage['email'] = user.email;
    localStorage['code'] = btoa(user.id);
    localStorage['facebookId'] = user.id;

    var params = {
      email: user.email,
      code: localStorage['code'],
      firstName: user.firstName,
      facebookId: user.id,
      provider: user.provider,
      action: 'facebookLogin'
    };
    console.log('params', params);
    this.executeApi('login.php', params, true);

  }

  loginPressed() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();

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
    if(responseJson.action == 'login' || responseJson.action == 'createAccount') {
      console.log('XXX login!!', file, responseJson);
      localStorage['user_id'] = responseJson.user.user_id;
      localStorage['admirerCount'] = responseJson.admirerCount;
      localStorage['messageCount'] = responseJson.infoObj.messageCount;
      localStorage['notifications'] = responseJson.notifications;
      localStorage['User'] = JSON.stringify(responseJson.user);
  
      this.syncUserWithLocalStorage(responseJson);
      this.messageEvent.emit('login');  
    }
  }

  valueChanged() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();

    this.submitDisabled = !email || !password;
  }
}
