import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DateItem } from '../classes/date-item';


@Component({
  selector: 'app-user-dates',
  templateUrl: './user-dates.component.html',
  styleUrls: ['./user-dates.component.scss']
})
export class UserDatesComponent extends BaseComponent implements OnInit {
  public dateList: any = [];
  public displayList: any = [];
  public override topButtons: any = ['Current Dates', 'Cancelled Dates'];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getMyDates', 'appApiCode2.php', []);
  }

  filterBy(num: number) {
    this.menuNum = num;

    this.displayList = [];
    this.dateList.forEach((element: any) => {
      console.log('hey', element);
      if ((num == 0 && element.status != 'Cancelled') || (num == 1 && element.status == 'Cancelled'))
        this.displayList.push(element);
    });

  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getMyDates') {
      this.dateList = [];
      responseJson.dates.forEach((element: any) => {
        this.dateList.push(new DateItem(element));
      });
      this.filterBy(0);
    }
  }

}
