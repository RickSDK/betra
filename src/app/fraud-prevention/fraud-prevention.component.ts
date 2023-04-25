import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-fraud-prevention',
  templateUrl: './fraud-prevention.component.html',
  styleUrls: ['./fraud-prevention.component.scss']
})
export class FraudPreventionComponent extends BaseComponent implements OnInit {
  public ipUsers: any = [];
  public ipList: any = [];
  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getFraudUsers', 'owners.php', {});
  }

  hardDeleteUser(ipUser: any) {
    this.getDataFromServer('hardDeleteUser', 'owners.php', {uid: ipUser.user_id});
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', responseJson);
    if (responseJson.action == 'getFraudUsers') {
      this.ipUsers = responseJson.ipUsers;

      var ipHash: any = {};
      responseJson.ipUsers.forEach((element: any) => {
        if (element.ip != '73.140.46.189') // rick's ip
          ipHash[element.ip] = true;
      });

      this.ipList = Object.keys(ipHash);
    }
  }
}
