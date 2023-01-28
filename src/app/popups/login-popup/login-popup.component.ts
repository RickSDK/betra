import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/classes/user';
import { BaseComponent } from '../../base/base.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

declare var $: any;
declare var google: any;
declare var getVersion: any;
declare var decodeJwtResponse: any;

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends BaseComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  public submitDisabled: boolean = true;
  public showLoginButtonFlg: boolean = true;
  public forgotPasswordFlg: boolean = false;
  public savedEmail: string = localStorage['savedEmail'] || '';
  public savedPassword: string = localStorage['savedPassword'] || '';
  public savedCode: string = localStorage['savedCode'] || '';
  public version = getVersion();

  constructor(private socialAuthService: SocialAuthService, private googleAuthService: SocialAuthService) { super(); }

  override ngOnInit(): void {
    this.submitDisabled = !this.savedEmail;

    /*
    this.socialAuthService.authState.subscribe((user) => {
      this.facebookToBetraLogin(user);
    });
*/
    /*
    this.googleAuthService.authState.subscribe((user) => {
      var socialUser = user;
      var isLoggedIn = (user != null);
      console.log('Google login code!', socialUser, isLoggedIn);
    });*/

  }

  loginWithGoogle(): void {
    if (google) {
      google.accounts.id.initialize({
        client_id: '859791760375-osmm35erl5lvdbisu2ofd8rfgk343vac.apps.googleusercontent.com',
        callback: this.handleCredentialResponse
      });
      google.accounts.id.prompt();
    } else
      console.log('no google!!');

    //this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  handleCredentialResponse(response: any) {
    console.log('handleCredentialResponse1!!!!!!', response);
    var credential = response.credential;
    console.log('credential!', credential.length);

    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    var firstName = responsePayload.name;
    var names = responsePayload.name.split(' ');
    if (names && names.length > 0)
      firstName = names[0];
    this.authorizedLogin(responsePayload.email, responsePayload.sub, 'Google-Signin', firstName);

    //var secondOption = JSON.parse(atob(response.credential.split('.')[1]));
    //console.log("secondOption: " + secondOption);
  }

  facebookSignin(): void {
    this.showLoginButtonFlg = false;
    this.loadingFlg = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.facebookToBetraLogin(user);
    });
  }
  /*
    googleLogOut(): void {
      this.googleAuthService.signOut();
    }*/

  logOut(): void {
    this.socialAuthService.signOut();
  }

  facebookToBetraLogin(user: any) {
    console.log('here is my facebookToBetraLogin user!', user);
    this.authorizedLogin(user.email, user.id, user.provider, user.firstName);
  }

  authorizedLogin(email: string, id: string, provider: string, firstName: string) {
    console.log('--------------authorizedLogin---------------');
    console.log('--------------------------------------');
    console.log('----------email', email);
    console.log('----------id', id);
    console.log('----------provider', provider);
    console.log('----------firstName', firstName);

    localStorage['email'] = email;
    localStorage['code'] = btoa(id);
    localStorage['facebookId'] = id;

    var params = {
      email: email,
      code: localStorage['code'],
      firstName: firstName,
      facebookId: id,
      provider: provider,
      action: 'facebookLogin'
    };
    console.log('params', params);
    this.executeApi('login.php', params, true);
  }

  loginPressed() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();

    localStorage['savedEmail'] = email;
    localStorage['savedPassword'] = password;
    localStorage['savedCode'] = btoa(password);

    localStorage['email'] = email;
    localStorage['code'] = btoa(password);
    var params = {
      email: email,
      code: localStorage['code'],
      action: 'login'
    };
    this.executeApi('login.php', params, true);
  }
  forgotPasswordPressed() {
    var email: string = $('#email').val();
    if (!email || email.length == 0) {
      this.errorMessage = 'enter your email address';
      return;
    }

    var params = {
      email: email,
      action: 'forgotPassword'
    };
    this.executeApi('login.php', params, true);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'login' || responseJson.action == 'createAccount') {
      console.log('XXX login!!', file, responseJson);
      localStorage['user_id'] = responseJson.user.user_id;
      /*
      localStorage['admirerCount'] = responseJson.admirerCount;
      localStorage['messageCount'] = responseJson.infoObj.messageCount;
      localStorage['dateCount'] = responseJson.infoObj.dateCount;
      localStorage['ownerAlerts'] = responseJson.infoObj.ownerAlerts;
      localStorage['notifications'] = responseJson.notifications;*/
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
