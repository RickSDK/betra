import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var lastLoginText: any;

@Component({
  selector: 'app-owner-teams',
  templateUrl: './owner-teams.component.html',
  styleUrls: ['./owner-teams.component.scss']
})
export class OwnerTeamsComponent extends BaseComponent implements OnInit {
  public players: any = [];
  public managmentTeam: any = [];
  public devTeam: any = [];
  public promotionsTeam: any = [];
  public activityLeads: any = [];
  public activityReps: any = [];

  public members1: any = [];
  public members2: any = [];
  public members3: any = [];
  public members4: any = [];
  public members5: any = [];
  public members6: any = [];

  public president: any = null;
  public vp: any = null;
  public director1: any = null;
  public director2: any = null;
  public projectManager: any = null;
  public marketingLead: any = null;
  public devLead: any = null;
  public marketingManager: any = null;

  public managers1: any = [];
  public managers2: any = [];

  public teams1 = [
    { name: 'Team 1 - California', lead: {}, members: this.members1, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 2 - Chicago', lead: {}, members: this.members2, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 3 - High Rollers', lead: {}, members: this.members3, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
  ];
  public teams2 = [
    { name: 'Team 4 - Seattle', lead: {}, members: this.members4, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 5 - Midwest', lead: {}, members: this.members5, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
    { name: 'Team 6 - East Coast', lead: {}, members: this.members6, clicks: 0, interestNo: 0, interestYes: 0, matches: 0, messages: 0, picVerifiedCount: 0, total: 0, emails: [] },
  ];

  public team: number = 0;
  public teams = ['Org Chart', 'Dev Team', 'Marketing Team', 'Team James', 'Team Halle'];
  public teamName: string = '';
  public ownerJames: any = null;
  public ownerHalle: any = null;


  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.team = params['id'] || 0;
      this.teamName = this.teams[this.team];
    });

    super.ngOnInit();
    this.getDataFromServer('getOwnerUsers', 'owners.php', []);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getOwnerUsers') {
      this.managmentTeam = [];
      this.devTeam = [];
      this.promotionsTeam = [];
      this.activityLeads = [];
      this.activityReps = [];

      this.players = responseJson.playerList;
      this.players.forEach((element: any) => {
        element.lastDay = lastLoginText(element.lastLogin);
        element.location = this.getUserLocation(element.city, element.state || element.stateName, element.countryName);

        if (element.user_id == 1)
          this.president = element;
        if (element.user_id == 233)
          this.vp = element;
        if (element.user_id == 122)
          this.director1 = element;
        if (element.user_id == 77)
          this.director2 = element;

        if (element.user_id == 85)
          this.projectManager = element;
        if (element.user_id == 156)
          this.marketingLead = element;
        if (element.user_id == 65)
          this.devLead = element;
        if (element.user_id == 53)
          this.marketingManager = element;



        if (element.user_id == 122)
          this.ownerJames = element;
        if (element.user_id == 235)
          this.ownerHalle = element;

        if (element.activityRep == 21 || element.user_id == 77 || element.user_id == 109 || element.user_id == 144 || element.user_id == 80 || element.user_id == 119 || element.user_id == 85 || element.user_id == 135)
          this.promotionsTeam.push(element);

        if (element.user_id == 1)
          this.managmentTeam.push(element);
        else if (element.activityRep == 22)
          this.devTeam.push(element);
        else if (element.activityRep > 10 && element.activityRep < 20)
          this.activityLeads.push(element);
        else if (element.activityRep > 0 && element.activityRep <= 6)
          this.activityReps.push(element);


        //leads------------
        if (element.activityRep == 11) {
          // will
          this.teams1[0].lead = element;
          this.managers1.push(element);
          this.addStatsForTeam(this.teams1[0], element);
        }
        if (element.activityRep == 12) {
          //karen
          this.managers1.push(element);
          this.teams1[1].lead = element;
          this.addStatsForTeam(this.teams1[1], element);
        }
        if (element.activityRep == 13) {
          //Randy
          this.managers1.push(element);
          this.teams1[2].lead = element;
          this.addStatsForTeam(this.teams1[2], element);

        }
        if (element.activityRep == 14) {
          //brittany
          this.managers2.push(element);
          this.teams2[0].lead = element;
          this.addStatsForTeam(this.teams2[0], element);
        }
        if (element.activityRep == 15) {
          //shubha
          this.managers2.push(element);
          this.teams2[1].lead = element;
          this.addStatsForTeam(this.teams2[1], element);
        }
        if (element.activityRep == 16) {
          //dana
          this.managers2.push(element);
          this.teams2[2].lead = element;
          this.addStatsForTeam(this.teams2[2], element);
        }

        //members------------
        if (element.activityRep == 1) {
          // will
          this.teams1[0].members.push(element);
          this.addStatsForTeam(this.teams1[0], element);
        }

        if (element.activityRep == 2) {
          //karen
          this.teams1[1].members.push(element);
          this.addStatsForTeam(this.teams1[1], element);
        }

        if (element.activityRep == 3) {
          //Randy
          this.teams1[2].members.push(element);
          this.addStatsForTeam(this.teams1[2], element);
        }

        if (element.activityRep == 4) {
          //brittany
          this.teams2[0].members.push(element);
          this.addStatsForTeam(this.teams2[0], element);
        }

        if (element.activityRep == 5) {
          //shubha
          this.teams2[1].members.push(element);
          this.addStatsForTeam(this.teams2[1], element);
        }

        if (element.activityRep == 6) {
          //dana
          this.teams2[2].members.push(element);
          this.addStatsForTeam(this.teams2[2], element);
        }

      });
    }
  }
  getUserLocation(city: string, state: string, countryName: string) {
    if (countryName != 'United States')
      return countryName;
    else
      return city + ', ' + state;

  }

  addStatsForTeam(team: any, member: any) {
    if (member && member.statsObj) {
      team.clicks += parseInt(member.statsObj.clicks);
      team.interestNo += parseInt(member.statsObj.interestNo);
      team.interestYes += parseInt(member.statsObj.interestYes);
      team.matches += parseInt(member.statsObj.matchLevel2);
      team.messages += parseInt(member.statsObj.messages);
      team.picVerifiedCount += parseInt(member.statsObj.picVerifiedCount) || 0;
      team.emails.push(member.email);

      team.total = team.clicks + team.matches * 10 + Math.round(team.messages / 10) + team.picVerifiedCount;

    }
  }

}
