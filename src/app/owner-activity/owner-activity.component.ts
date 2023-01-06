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
  public members5: any = [];
  public members6: any = [];
  public teams = [
    { name: 'Team 1 - California', lead: {}, members: this.members1, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 2 - Chicago', lead: {}, members: this.members2, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 3 - High Rollers', lead: {}, members: this.members3, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 4 - Seattle', lead: {}, members: this.members4, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 5 - Midwest', lead: {}, members: this.members5, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 6 - East Coast', lead: {}, members: this.members6, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
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
        if (element.activityRep == 11) { 
          // will
          this.teams[0].lead = element;
          this.addStatsForTeam(this.teams[0], element);
        }
        if (element.activityRep == 12) {
          //karen
          this.teams[1].lead = element;
          this.addStatsForTeam(this.teams[1], element);
        }
        if (element.activityRep == 13) {
          //Randy
          this.teams[2].lead = element;
          this.addStatsForTeam(this.teams[2], element);

        }
        if (element.activityRep == 14) {
          //brittany
          this.teams[3].lead = element;
          this.addStatsForTeam(this.teams[3], element);
        }
        if (element.activityRep == 15) {
          //shubha
          this.teams[4].lead = element;
          this.addStatsForTeam(this.teams[4], element);
        }
        if (element.activityRep == 16) {
          //dana
          this.teams[5].lead = element;
          this.addStatsForTeam(this.teams[5], element);
        }

        //members------------
        if (element.activityRep == 1) {
          // will
          this.teams[0].members.push(element);
          this.addStatsForTeam(this.teams[0], element);
        }

        if (element.activityRep == 2) {
          //karen
          this.teams[1].members.push(element);
          this.addStatsForTeam(this.teams[1], element);
        }

        if (element.activityRep == 3) {
          //Randy
          this.teams[2].members.push(element);
          this.addStatsForTeam(this.teams[2], element);
        }

        if (element.activityRep == 4) {
          //brittany
          this.teams[3].members.push(element);
          this.addStatsForTeam(this.teams[3], element);
        }

        if (element.activityRep == 5 ) {
          //shubha
          this.teams[4].members.push(element);
          this.addStatsForTeam(this.teams[4], element);
        }

        if (element.activityRep == 6 ) {
          //dana
          this.teams[5].members.push(element);
          this.addStatsForTeam(this.teams[5], element);
        }
        //console.log('xxx', element);
      });
    }
  }
  addStatsForTeam(team:any, member: any) {
    if(member && member.statsObj) {
      team.clicks += parseInt(member.statsObj.clicks);
      team.interestNo += parseInt(member.statsObj.interestNo);
      team.interestYes += parseInt(member.statsObj.interestYes);
      team.matches += parseInt(member.statsObj.matchLevel2);
      team.messages += parseInt(member.statsObj.messages);
      team.picVerifiedCount += parseInt(member.statsObj.picVerifiedCount) || 0;
  
      team.total = team.clicks + team.matches*10 + Math.round(team.messages/10) + team.picVerifiedCount;
  
    }
  }

}
