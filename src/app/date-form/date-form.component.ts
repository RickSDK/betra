import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.scss']
})
export class DateFormComponent implements OnInit {
  @Input('dateObj') dateObj: any = null;
  @Input('requestObj') requestObj: any = null;

  constructor() { }

  ngOnInit(): void {
    if (!this.dateObj) {
      this.dateObj = {
        date: '',
        time: '',
        location: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      }
    }
  }

}
