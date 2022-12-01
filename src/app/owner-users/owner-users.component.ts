import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-owner-users',
  templateUrl: './owner-users.component.html',
  styleUrls: ['./owner-users.component.scss']
})
export class OwnerUsersComponent extends BaseComponent implements OnInit {
  public players: any = [];
  public selectedPlayer: any = null;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getOwnerUsers();
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
      this.players.forEach((element: any) => {
        var parts = element.lastLogin.split(' ');
        element.lastDay = parts[0];
      });
    }
    if (responseJson.action == 'updateUserRegion') {
      this.getOwnerUsers();
    }
  }
  assignRegion(player: any) {
    this.selectedPlayer = player;
  }
  updateUserRegion() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.selectedPlayer.user_id,
      region: $('#region').val(),
      division: $('#division').val(),
      zone: $('#zone').val(),
      action: "updateUserRegion"
    };
    console.log('params', params);
    this.executeApi('owners.php', params, true);
    this.selectedPlayer = null;
  }

}
