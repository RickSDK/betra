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

  public tooYoungFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    //var obj = getDateObjFromJSDate(this.birthdate);
    //this.tooYoungFlg = (obj.jsDate == "Invalid Date" || obj.daysAgo < 365 * 18);
  }
  verifyBirthday() {
    var e = (document.getElementById('birthdate') as HTMLInputElement);
    if (e) {
      this.birthdate = e.value;
      var obj = getDateObjFromJSDate(e.value);
      this.tooYoungFlg = (obj.daysAgo < 365 * 18);
      this.messageEvent.emit('change');
    }
  }
}
