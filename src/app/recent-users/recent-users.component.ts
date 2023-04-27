import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-recent-users',
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent extends BaseComponent implements OnInit {
  public users: any = [];
  public showContactInfo: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getRecentUsers', 'owners.php', {});
  }

  ngStyleUser(status: string) {
    if (status == 'Active')
      return { 'background-color': '#cfc' };

    if (status == 'Deleted')
      return { 'background-color': 'red' };

    return { 'background-color': 'white' };
  }
  sendWelcomeEmail(user: any) {
    console.log('xxx', user.user_id);
    this.getDataFromServer('sendWelcomeEmail', 'owners.php', { uid: user.user_id });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getRecentUsers') {
      this.users = [];
      responseJson.users.forEach((element: any) => {
        var dt = getDateObjFromJSDate(element.created);
        element.localDate = dt.localDate;
        this.users.push(element);

      });
    }
  }
}
