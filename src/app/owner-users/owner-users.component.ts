import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-users',
  templateUrl: './owner-users.component.html',
  styleUrls: ['./owner-users.component.scss']
})
export class OwnerUsersComponent extends BaseComponent implements OnInit {
  public players: any = [];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getOwnerUsers()
  }
  getOwnerUsers() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getOwnerUsers"
    };
    this.executeApi('owners.php', params, true);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getOwnerUsers') {
      this.players = responseJson.playerList;
    }
  }

}