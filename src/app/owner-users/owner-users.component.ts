import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;
declare var lastLoginText: any;

@Component({
  selector: 'app-owner-users',
  templateUrl: './owner-users.component.html',
  styleUrls: ['./owner-users.component.scss']
})
export class OwnerUsersComponent extends BaseComponent implements OnInit {
  public players: any = [];
  public selectedPlayer: any = null;
  public option: number = 0;
  public menuButtons: any = ['United States', 'International'];
  public usList: any = [];
  public internationalList: any = [];
  public regionFlg: boolean = false;

  public managmentTeam: any = [];
  public devTeam: any = [];
  public promotionsTeam: any = [];
  public activityLeads: any = [];
  public activityReps: any = [];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getOwnerUsers();
  }
  changeMenu(num: number) {
    this.menuNum = num;
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
      this.usList = [];
      this.internationalList = [];

      this.players = responseJson.playerList;
      this.players.forEach((element: any) => {
        element.lastDay = lastLoginText(element.lastLogin);
        element.location = this.getUserLocation(element.city, element.state, element.countryName);

        if (element.user_id == 1 || element.user_id == 122 || element.user_id == 118 || element.user_id == 156)
          this.managmentTeam.push(element);
        else if (element.user_id == 161 || element.user_id == 141 || element.user_id == 85 || element.user_id == 135 || element.user_id == 155 || element.user_id == 77 || element.user_id == 65 || element.user_id == 73 || element.user_id == 74 || element.user_id == 75)
          this.devTeam.push(element);
        else if (element.user_id == 53 || element.user_id == 1)
          this.promotionsTeam.push(element);
        else if (element.user_id == 10 || element.user_id == 109 || element.user_id == 119 || element.user_id == 80)
          this.activityLeads.push(element);
        else if (element.user_id == 66 || element.user_id == 97 || element.user_id == 134)
          this.activityReps.push(element);
        else if (element.user_id == 139 || element.user_id == 98 || element.user_id == 146)
          this.activityReps.push(element);
        else if (element.user_id == 112 || element.user_id == 92 || element.user_id == 87)
          this.activityReps.push(element);
        else if (element.user_id == 51 || element.user_id == 48 || element.user_id == 61)
          this.activityReps.push(element);
        else
          this.usList.push(element);
      });
    }
    if (responseJson.action == 'updateUserRegion' || responseJson.action == 'sendEmail') {
      this.getOwnerUsers();
    }
  }
  getUserLocation(city: string, state: string, countryName: string) {
    if (countryName != 'United States')
      return countryName;
    else
      return city + ', ' + state;

  }
  choosePlayer(player: any, num: number) {
    this.option = num;
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
  sendEmail() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.selectedPlayer.user_id,
      action: "sendEmail"
    };
    console.log('params', params);
    this.executeApi('owners.php', params, true);
    this.selectedPlayer = null;
  }

}
