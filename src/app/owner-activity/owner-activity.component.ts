import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var lastLoginText: any;

@Component({
  selector: 'app-owner-activity',
  templateUrl: './owner-activity.component.html',
  styleUrls: ['./owner-activity.component.scss']
})
export class OwnerActivityComponent extends BaseComponent implements OnInit {

  public members1: any = [];
  public members2: any = [];
  public members3: any = [];
  public members4: any = [];
  public teams = [
    { name: 'Team 1', lead: {}, members: this.members1, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0 },
    { name: 'Team 2', lead: {}, members: this.members2, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0 },
    { name: 'Team 3', lead: {}, members: this.members3, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0 },
    { name: 'Team 4', lead: {}, members: this.members4, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0 },
  ];


  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getOwnerUsers', 'owners.php', []);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getOwnerUsers') {
      responseJson.playerList.forEach((element: any) => {
        element.lastDay = lastLoginText(element.lastLogin);

        //leads------------
        if (element.user_id == 10) {
          this.teams[0].lead = element;
          this.addStatsForTeam(this.teams[0], element);
        }
        if (element.user_id == 109) {
          this.teams[1].lead = element;
          this.addStatsForTeam(this.teams[1], element);
        }
        if (element.user_id == 80) {
          this.teams[2].lead = element;
          this.addStatsForTeam(this.teams[2], element);

        }
        if (element.user_id == 119) {
          this.teams[3].lead = element;
          this.addStatsForTeam(this.teams[3], element);
        }

        //members------------
        if (element.user_id == 97 || element.user_id == 66 || element.user_id == 16) {
          this.teams[0].members.push(element);
          this.addStatsForTeam(this.teams[0], element);
        }

        if (element.user_id == 98 || element.user_id == 146 || element.user_id == 139) {
          this.teams[1].members.push(element);
          this.addStatsForTeam(this.teams[1], element);
        }

        if (element.user_id == 112 || element.user_id == 92 || element.user_id == 128) {
          this.teams[2].members.push(element);
          this.addStatsForTeam(this.teams[2], element);
        }

        if (element.user_id == 51 || element.user_id == 48 || element.user_id == 61 ) {
          this.teams[3].members.push(element);
          this.addStatsForTeam(this.teams[3], element);
        }
        //console.log('xxx', element);
      });
    }
  }
  addStatsForTeam(team:any, member: any) {
    team.clicks += parseInt(member.statsObj.clicks);
    team.interestNo += parseInt(member.statsObj.interestNo);
    team.interestYes += parseInt(member.statsObj.interestYes);
    team.matches += parseInt(member.statsObj.matchLevel2);
    team.messages += parseInt(member.statsObj.messages);
    team.picVerifiedCount += parseInt(member.statsObj.picVerifiedCount) || 0;

    team.total = team.clicks + team.matches*10 + Math.round(team.messages/10) + team.picVerifiedCount;
  }

}
