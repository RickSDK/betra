import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

declare var $: any;
declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-sign-up-popup',
  templateUrl: './sign-up-popup.component.html',
  styleUrls: ['./sign-up-popup.component.scss']
})
export class SignUpPopupComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  public option1Flg: boolean = true;
  public option2Flg: boolean = false;
  public option3Flg: boolean = false;
  public submitFlg: boolean = false;
  public optionNum: number = 0;
  public monthOptions: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dayOptions: any = [];
  public yearOptions: any = [];

  public submitDisabled: boolean = true;
  public tooYoungFlg = false;
  public femaleFlg: boolean = false;
  public maleFlg: boolean = false;
  public gender: string = '';
  public birthDate: string = '';
  public birthYear: string = '';
  public showLoginButtonFlg: boolean = true;

  constructor(private socialAuthService: SocialAuthService, private router: Router) { super(); }

  override ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      if (!this.showLoginButtonFlg)
        this.facebookToBetraLogin(user);
    });

  }
  pressGetStartedButton() {
    var e = document.getElementById("signup-box");
    if(e)
      e.style.top = "100px";
    this.optionNum = 1;
    this.showLoginButtonFlg = true;
  }
  signupPressed() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();
    var firstName: string = $('#firstName').val();
    var zipcode: string = $('#zipcode').val();

    if(!email || !password || !firstName) {
      this.errorMessage = 'fill out form';
      return;
    }
    //localStorage['email'] = email;
    var code = btoa(password);
    localStorage['code'] = code;
    localStorage['email'] = email;

    var params = {
      email: email,
      code: code,
      gender: this.gender,
      birthDate: this.birthDate,
      birthYear: this.birthYear,
      firstName: firstName.charAt(0).toUpperCase() + firstName.toLowerCase().slice(1),
      findLoveFlg: this.option1Flg ? 'Y' : '',
      meetPeopleFlg: this.option2Flg ? 'Y' : '',
      makeMoneyFlg: this.option3Flg ? 'Y' : '',
      zipcode: zipcode,
      action: 'createAccount'
    };

    this.optionNum = 2;
    console.log('xxx', params);
    this.executeApi('login.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);

    localStorage['user_id'] = responseJson.user.user_id;
    localStorage['User'] = JSON.stringify(responseJson.user);
    this.syncUserWithLocalStorage(responseJson);
    this.router.navigate(['/profile']);
  }
  okPressed() {
    this.messageEvent.emit('login');
  }

  facebookSignin(): void {
    this.showLoginButtonFlg = false;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleSignin(): void {
    this.errorMessage = 'Google+ not ready yet';
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  facebookToBetraLogin(user: any) {
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

  selectGender(event: any) {
    this.gender = '';
    if (event && event.target) {
      if (event.target.value == 'I am a male')
        this.gender = 'M';
      if (event.target.value == 'I am a female')
        this.gender = 'F';
    }
  }
  valueChanged() {
    var firstName: string = $('#firstName').val();
    var email: string = $('#email').val();
    var password: string = $('#password').val();
    this.submitDisabled = !firstName || !email || !password;
  }

}
