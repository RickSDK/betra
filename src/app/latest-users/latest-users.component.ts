import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-latest-users',
  templateUrl: './latest-users.component.html',
  styleUrls: ['./latest-users.component.scss']
})
export class LatestUsersComponent extends BaseComponent implements OnInit {
  public users: any = [];
  public actionCount: number = 0;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getLatestUsers', 'owners.php', {});
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getLatestUsers') {
      this.users = [];
      responseJson.playerList.forEach((element: any) => {
        var dbStatus = element.status;
        var user = new User(element, this.user);
        user.status = dbStatus;
        this.users.push(user);
      });
      this.users.forEach((element: any) => {
        if (element.potentialLoveInterestFlg && element.status == 'Active' && !element.matchObj.you_interested)
          this.actionCount++;
      });

    }
  }

  ngStyleRow(person: User) {
    if (person.status == 'Deleted')
      return { 'background-color': 'red' };
    else if (person.status == 'Active' && person.potentialLoveInterestFlg)
      return { 'background-color': '#cfc' };
    else if (person.status == 'Active' && !person.potentialLoveInterestFlg)
      return { 'background-color': '#ffffc0' };
    else
      return { 'background-color': 'white' };

  }
}
