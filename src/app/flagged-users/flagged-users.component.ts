import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-flagged-users',
  templateUrl: './flagged-users.component.html',
  styleUrls: ['./flagged-users.component.scss']
})
export class FlaggedUsersComponent extends BaseComponent implements OnInit {
  public playerList: any = [];
  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getFlaggedUsers', 'owners.php', []);

  }

  buttonPressed(player:any, action:string) {
    this.playerList = [];
    var params = {uid: player.user_id};
    this.getDataFromServer(action, 'owners.php', params);
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getFlaggedUsers') {
      this.playerList = [];
      responseJson.playerList.forEach((element: any) => {
        this.playerList.push(new User (element));
      });

    }
  }
}
