import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-birthday-input',
  templateUrl: './birthday-input.component.html',
  styleUrls: ['./birthday-input.component.scss']
})
export class BirthdayInputComponent implements OnInit {
  @Input('birthdate') birthdate: string = '';
  @Output() messageEvent = new EventEmitter<string>();

  public errorMessage: string = '';
  public month: string = '';
  public day: string = '';
  public year: string = '';
  public age: string = '';
  public months: any = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public days: any = [];
  public years: any = [];

  constructor() { }

  ngOnInit(): void {
    for (var i = 1; i <= 31; i++)
      this.days.push(i.toString().padStart(2, '0'));

    for (let i = 2010; i >= 1930; i--)
      this.years.push(i);

    if (this.birthdate && this.birthdate.length > 0) {
      var parts = this.birthdate.split('-');
      if (parts.length == 3 && parts[2].length <= 2) {
        this.year = parts[0];
        this.month = parts[1];
        this.day = parts[2];
        console.log('birthday', this.day, this.month, this.year);
        //this.verifyBirthday();
        //        var dt = getDateObjFromJSDate(this.birthdate);
        //      if (dt.jsDate == 'Invalid Date')
        //      this.errorMessage = 'Invalid Date';
      }
    }
  }
  verifyMonth() {
    if (this.errorMessage == "invalid month")
      this.errorMessage = "";
    var e = (document.getElementById('month') as HTMLInputElement);
    if (e) {
      this.month = e.value;
      if (parseInt(e.value) > 12)
        this.errorMessage = "invalid month";

      if (e.value.length == 2) {
        var d = (document.getElementById('day') as HTMLInputElement);
        d.focus();
      }
      this.verifyBirthday();
    }
    this.messageEvent.emit('change');
  }
  verifyDay() {
    if (this.errorMessage == "invalid day")
      this.errorMessage = "";
    var e = (document.getElementById('day') as HTMLInputElement);
    if (e) {
      this.day = e.value;
      if (parseInt(e.value) > 31 || parseInt(e.value) < 1)
        this.errorMessage = "invalid day";

      if (e.value.length == 2) {
        var d = (document.getElementById('year') as HTMLInputElement);
        d.focus();
      }
      this.verifyBirthday();

    }
    this.messageEvent.emit('change');
  }
  verifyYear() {
    this.errorMessage = "";
    var e = (document.getElementById('year') as HTMLInputElement);
    if (e) {
      this.year = e.value;
      //      if (e.value.length == 4) {
      this.verifyBirthday();
      //      }
    }
    this.messageEvent.emit('change');
  }
  verifyBirthday() {
    this.errorMessage = '';
    var now = getDateObjFromJSDate();
    var birthdate = this.year + '-' + this.month + '-' + this.day + ' ' + now.time;
    var obj = getDateObjFromJSDate(birthdate);
    if (obj.jsDate == 'Invalid Date')
      this.errorMessage = 'Invalid Date';
    else {
      var age = Math.floor(obj.daysAgo / 365);
      this.age = age.toString();
      if (age < 18)
        this.errorMessage = 'Too young. Must be 18 years old.';
      if (age > 100)
        this.errorMessage = 'Enter a valid date.';

    }
  }
}
