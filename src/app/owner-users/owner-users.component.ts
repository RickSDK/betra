import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

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
  public allTeam: any = [];
  public usList: any = [];
  public internationalList: any = [];
  public regionFlg: boolean = false;

  public managmentTeam: any = [];
  public devTeam: any = [];
  public promotionsTeam: any = [];
  public activityLeads: any = [];
  public activityReps: any = [];

  public level5Owners: any = [];
  public level4Owners: any = [];
  public level3Owners: any = [];
  public level2Owners: any = [];
  public level1Owners: any = [];

  public page: any = {};

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getOwnerUsers', 'owners.php', []);
  }
  changeMenu(num: number) {
    this.menuNum = num;
  }

  updateActivityTeam() {
    var params = { uid: this.selectedPlayer.user_id, activityRep: $('#activityRep').val() }
    this.getDataFromServer('updateActivityTeam', 'owners.php', params);
    this.selectedPlayer = null;
  }

  demoteUser() {
    var params = { matchId: this.selectedPlayer.user_id }
    this.getDataFromServer('demoteUser', 'appApiCode2.php', params);
    this.selectedPlayer = null;
  }

  emailUpdates() {
    this.loadingFlg = true;
    var count = 0;
    if (0) {
      this.allTeam.forEach((element: { user_id: any; firstName: any; }) => {
        count++;
        setTimeout(() => {
          console.log('emailing ', element.user_id, element.firstName);
          this.getDataFromServer('emailUpdates', 'report.php', { uid: element.user_id });

        }, count * 1000);
      });
    } else
      this.getDataFromServer('emailUpdates', 'report.php', { uid: 1 });
    console.log('count: ', count);
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getOwnerUsers') {
      this.page = responseJson;
      this.usList = [];
      this.internationalList = [];
      this.managmentTeam = [];
      this.devTeam = [];
      this.promotionsTeam = [];
      this.activityLeads = [];
      this.activityReps = [];

      this.level5Owners = [];
      this.level4Owners = [];
      this.level3Owners = [];
      this.level2Owners = [];
      this.level1Owners = [];
      var emailList: any = [];

      this.allTeam = responseJson.playerList;

      responseJson.playerList.forEach((element: any) => {

        var player = new User(element);
        emailList.push(player.email);

        if (element.adminLevel == 5)
          this.level5Owners.push(player);
        else if (element.adminLevel == 4)
          this.level4Owners.push(player);
        else if (element.adminLevel == 3)
          this.level3Owners.push(player);
        else if (element.adminLevel == 2)
          this.level2Owners.push(player);
        else
          this.level1Owners.push(player);
        /*
                if (element.user_id == 1 || element.user_id == 122 || element.user_id == 118 || element.user_id == 156 || element.user_id == 233 || element.user_id == 235)
                  this.managmentTeam.push(player);
                else if (element.user_id == 161 || element.user_id == 141 || element.user_id == 85 || element.user_id == 155 || element.user_id == 65 || element.user_id == 73 || element.user_id == 74 || element.user_id == 75)
                  this.devTeam.push(player);
                else if (element.user_id == 53 || element.user_id == 1)
                  this.promotionsTeam.push(player);
                else if (element.activityRep > 10)
                  this.activityLeads.push(player);
                else if (element.activityRep > 0 && element.activityRep <= 6)
                  this.activityReps.push(player);
                else
                  this.usList.push(player);*/
      });
      //console.log('total number owners: ', responseJson.playerList.length);
      //console.log(emailList.join('; '))
    }

    if (responseJson.action == 'updateUserRegion' || responseJson.action == 'sendEmail' || responseJson.action == 'demoteUser') {
      this.getDataFromServer('getOwnerUsers', 'owners.php', []);
    }
  }

  ownersTableEvent(player: any) {
    //console.log('made it!');
    this.choosePlayer(player, 7);
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
    //console.log('params', params);
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
    //console.log('params', params);
    this.executeApi('owners.php', params, true);
    this.selectedPlayer = null;
  }

}
