import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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

  constructor() { super(); }

  override ngOnInit(): void {
    for (var i = 1; i <= 31; i++)
      this.dayOptions.push(i);

    let year = 2022;
    for (var i = 1; i <= 100; i++) {
      year--;
      this.yearOptions.push(year);
    }

  }
  signupPressed() {
    var email: string = $('#email').val();
    var password: string = $('#password').val();
    var firstName: string = $('#firstName').val();
    var zipcode: string = $('#zipcode').val();

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
      firstName: firstName,
      findLoveFlg: this.option1Flg?'Y':'',
      meetPeopleFlg: this.option2Flg?'Y':'',
      makeMoneyFlg: this.option3Flg?'Y':'',
      zipcode: zipcode,
      action: 'createAccount'
    };

    this.optionNum = 2;
    console.log('xxx', params);
    this.executeApi('login.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);

    localStorage['user_id'] = responseJson.user_id;
    localStorage['User'] = JSON.stringify(responseJson);
  }
  okPressed() {
    this.messageEvent.emit('login');
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
    var month: string = $('#month').val();
    var day: string = $('#day').val();
    var year: string = $('#year').val();
    this.birthYear = year;
    var monNum = 0;
    var i = 0;
    for (var i = 0; i < 12; i++) {
      if (this.monthOptions[i] == month)
        monNum = i + 1;
    }


    const d = new Date(year+'/'+monNum+'/'+day); 
    var obj = getDateObjFromJSDate(d);
    this.birthDate = obj.oracle;

    var now = new Date();
    let seconds = Math.abs(now.getTime() - d.getTime())/1000;
    var hours = seconds/3600;
    var days = hours/24;
    var age = days/365;

    this.tooYoungFlg = (age < 18);

    console.log(age, this.birthDate, d, month, monNum, day, year, firstName, email, password);
  }

}
