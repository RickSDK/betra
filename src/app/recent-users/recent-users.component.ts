import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-recent-users',
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent extends BaseComponent implements OnInit {
  public users: any = [];
  public showContactInfo: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getRecentUsers', 'owners.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('--postSuccessApi--', responseJson);
    if (responseJson.action == 'getRecentUsers') {
      this.users = responseJson.users;
      this.users.forEach((element: any) => {
        var dt = getDateObjFromJSDate(element.created);
        element.localDate = dt.localDate;
      });
    }
  }
}
