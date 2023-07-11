import { Component, OnInit, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { User } from 'src/app/classes/user';
import { BaseComponent } from '../../base/base.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { BaseLoginProvider } from 'angularx-social-login';
import { DatabaseService } from '../../services/database.service';

declare var $: any;
declare var google: any;
declare var getVersion: any;
declare var decodeJwtResponse: any;
declare let getPlatform: any;

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent extends BaseComponent implements OnInit {
  @Input('login') login: number = 0;
  @Input('referralId') referralId: number = 0;
  @Input('liteModeFlg') override liteModeFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public static readonly PROVIDER_ID: string = 'APPLE';
  protected auth2: any;

  public submitDisabled: boolean = true;
  public showLoginButtonFlg: boolean = true;
  public forgotPasswordFlg: boolean = false;
  public savedEmail: string = localStorage['savedEmail'] || '';
  public savedPassword: string = localStorage['savedPassword'] || '';
  public savedCode: string = localStorage['savedCode'] || '';
  public version = getVersion();
  public facebookButtonPressedFlg: boolean = false;
  public googleButtonPressedFlg: boolean = false;
  public appleButtonPressedFlg: boolean = false;
  public policyCheckboxChecked: boolean = false;
  public googleFoundFlg: boolean = false;
  public platform: string = getPlatform();
  public loginAttempt: number = 0;


  constructor(private router: Router, private ngZone: NgZone,
    private socialAuthService: SocialAuthService,
    private googleAuthService: SocialAuthService, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    this.submitDisabled = !this.savedEmail;
    this.forgotPasswordFlg = false;

    setTimeout(() => {
      if (google)
        this.googleFoundFlg = true;
    }, 1000);


    if (localStorage['referralId'] > 0)
      this.referralId = localStorage['referralId'];

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
  /*
    public initialize(): Promise<void> {
      return new Promise((resolve, _reject) => {
        this.loadScript(
          AppleLoginProvider.PROVIDER_ID,
          'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
          () => {
            AppleID.auth.init({
              clientId: this.clientId,
              scope: 'name email',
              redirectURI: 'https://auth.example.com/auth/apple',
              state: '[ANYTHING]', //used to prevent CSFR
              usePopup: false,
            });
            resolve();
          }
        );
      });
    }*/

  ngStyleGrayScreen() {
    let height = window.innerHeight || 750;
    if (this.login == 0)
      return { 'top': '15px', 'height': '220px' };
    else
      return { 'top': '40px', 'height': '430px' };
  }

  ngStyleLoginBox() {
    let height = window.innerHeight || 750;
    if (this.login == 0)
      return { 'top': '15px', 'height': '220px' };
    else
      return { 'top': '40px', 'height': '430px' };
  }

  loginWithGoogle(): void {
    this.googleButtonPressedFlg = true;
    localStorage['loginCheck'] = '';
    setTimeout(() => {
      if (localStorage['loginCheck'] == '') {
        this.errorMessage = 'Sorry, google login not working. Try again later';
        this.googleButtonPressedFlg = false;
      }
    }, 15000);
    console.log('loginWithGoogle', google);
    if (google) {
      this.googleFoundFlg = true;
      google.accounts.id.initialize({
        client_id: "859791760375-osmm35erl5lvdbisu2ofd8rfgk343vac.apps.googleusercontent.com",
        callback: (window as any)['handleCredentialResponse'] =
          (response: any) => this.ngZone.run(() => {
            this.handleCredentialResponse(response);
          })
      });
      google.accounts.id.prompt();
      /*
      google.accounts.id.initialize({
        client_id: '859791760375-osmm35erl5lvdbisu2ofd8rfgk343vac.apps.googleusercontent.com',
        callback: this.handleCredentialResponse,
      });
      google.accounts.id.prompt();*/
    } else {
      console.log('no google!!');
      this.errorMessage = 'Sorry, google login not responding. Try again later';
    }

    //this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  handleCredentialResponse(response: any) {
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
  }

  appleSignin(): void {
    this.appleButtonPressedFlg = true;
    var YOUR_CLIENT_ID = 'com.betradating.app';
    // var YOUR_REDIRECT_ID = `${window.location.origin}/#/?login=1`;
    var YOUR_REDIRECT_ID = 'https://www.betradating.com';

    window.open(
      'https://appleid.apple.com/auth/authorize?' +
      `client_id=${YOUR_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(YOUR_REDIRECT_ID)}&` +
      'response_type=code id_token&' +
      'scope=name email&' +
      'response_mode=form_post',
      '_blank',
    );
    /*
        window.open(
          'https://appleid.apple.com/auth/authorize?' +
            `client_id=${YOUR_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(YOUR_REDIRECT_ID)}&` +
            'response_type=code id_token&' +
            'scope=name email&' +
            'response_mode=form_post',
          '_blank',
        );*/

    // Here is our new message event listener
    window.addEventListener('message', event => {
      console.log('Got a message: ', event);
      this.appleButtonPressedFlg = false;
      if (!event.data || !event.data.data)
        this.errorMessage = 'Sorry, apple login not working';
    });

  }

  facebookSignin(): void {
    this.facebookButtonPressedFlg = true;
    localStorage['loginCheck'] = '';
    setTimeout(() => {
      if (localStorage['loginCheck'] == '')
        this.errorMessage = 'Sorry, facebook login not working. Try again later';
    }, 10000);
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
    localStorage['loginCheck'] = 'done';
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
      referralId: this.referralId,
      provider: provider,
      action: 'facebookLogin'
    };
    console.log('params', params);
    this.executeApi('login.php', params, true);
  }

  resetFlags(login: number) {
    console.log('resetFlags', login);
    this.login = login;
    this.forgotPasswordFlg = false;
    this.loadingFlg = false;
    this.facebookButtonPressedFlg = false;
    this.googleButtonPressedFlg = false;
    this.errorMessage = '';
  }
  loginPressed() {
    this.resetFlags(1);
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

  override postErrorApi(file: string, error: string, data: string = '') {
    this.loadingFlg = false;
    if (error == '')
      error = 'No success message returned';
    this.errorMessage = error;
    console.log('postErrorApi', error, data);
    if (this.loginAttempt++ < 4 && data == 'fetch error') {
      this.errorMessage = '';
      this.loadingFlg = true;
      setTimeout(() => {
        this.loginPressed();
      }, 1000);
    }
  }

  forgotPasswordPressed() {
    this.resetFlags(this.login);
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
      if (responseJson.action == 'createAccount') {
        this.router.navigate(['/profile']);
      }
    }
  }

  valueChanged() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();

    this.submitDisabled = !email || !password;
  }

  //------------------ signup------------------

  signupPressed() {
    this.resetFlags(2);
    if (!this.policyCheckboxChecked) {
      this.errorMessage = 'Please accept the policy disclaimer by checking the box above the signup button.';
      return;
    }
    var email: string = $('#email').val();
    var password: string = $('#password').val();
    var firstName: string = $('#firstName').val();

    if (!email || !password || !firstName) {
      this.errorMessage = 'Fill out the form.';
      return;
    }

    if (this.platform == 'IOS') {
      this.liteModeFlg = true;
    }
    var code = btoa(password);
    localStorage['code'] = code;
    localStorage['email'] = email;

    var params = {
      email: email,
      code: code,
      referralId: this.referralId,
      firstName: firstName.charAt(0).toUpperCase() + firstName.toLowerCase().slice(1),
      findLoveFlg: this.liteModeFlg ? 'N' : 'Y',
      action: 'createAccount'
    };

    console.log('xxx', params);
    this.executeApi('login.php', params, true);
  }

}
