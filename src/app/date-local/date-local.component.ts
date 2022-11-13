import { Component, OnInit, Input } from '@angular/core';

declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-date-local',
  templateUrl: './date-local.component.html',
  styleUrls: ['./date-local.component.scss']
})
export class DateLocalComponent implements OnInit {
  @Input('date') date: any = null;
  @Input('time') time: any = null;
  public displayDate: string = '';
  public distanceAway: string = '';

  constructor() { }

  ngOnInit(): void {
    var dt = getDateObjFromJSDate(this.date + ' ' + this.time);
    //console.log('xxxXXX', dt);
    this.displayDate = dt.dayOfWeek + ', ' + dt.localDate +' '+ dt.localTime2;
    this.distanceAway = dt.distanceAway;
  }

}
