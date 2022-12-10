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
