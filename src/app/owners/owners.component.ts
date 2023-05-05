import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent extends BaseComponent implements OnInit {
  public ownersPage: any = null;
  public zone: string = '';
  public ownerLevels = [
    { level: 1, name: 'Owner', percentage: '0.5%', payouts: '$500' },
    { level: 2, name: 'Lead', percentage: '1%', payouts: '$1,000' },
    { level: 3, name: 'Manager', percentage: '2%', payouts: '$2,000' },
    { level: 4, name: 'Director', percentage: '3%', payouts: '$3,000' },
    { level: 5, name: 'VP', percentage: '4%', payouts: '$4,000' },
  ];
  public yourLevel: any = this.ownerLevels[0];
  public showCongratulationsFlg: boolean = false;
  public goalReachedFlg: boolean = false;
  public emailButtonPressed: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.user && this.user.user_id > 0) {
      this.zone = this.user.adminZone;
      this.getMyOwnerInfo();
    }
  }
  getMyOwnerInfo() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getMyOwnerInfo",
      zone: this.zone
    };
    console.log('params', params);
    this.executeApi('owners.php', params, true);
  }

  sendEmails() {
    this.emailButtonPressed = true;
    this.getDataFromServer('emailTeamBoost', 'owners.php', {});
  }

  acceptPromotion() {
    if (this.yourLevel.level == 1 && this.user.datingPool.length < 12) {
      this.errorMessage = 'Whoa!';
      return;
    }
    this.showCongratulationsFlg = true;
    this.getDataFromServer('promoteOwner', 'owners.php', {});
    this.goalReachedFlg = false;
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getMyOwnerInfo') {
      this.ownersPage = responseJson;
      console.log('getMyOwnerInfo!', responseJson);
      var level = responseJson.adminLevel || 1;
      this.yourLevel = this.ownerLevels[level - 1];
      this.goalReachedFlg = false;
      if (level == 1)
        this.goalReachedFlg = (this.user.datingPool.length >= 12);
      if (level == 2)
        this.goalReachedFlg = (responseJson.blogComments >= 2 && responseJson.messageCount >= 40 && responseJson.reviewCount >= 3 && responseJson.bugsCount >= 2 && responseJson.voteCount >= 2 && responseJson.consecutiveDays>3);

      if (level == 3)
        this.goalReachedFlg = (responseJson.peopleMessaged >= 20 && responseJson.messageCount >= 100 && responseJson.profilesSwiped >= 25 && responseJson.reviewCount >= 6 && responseJson.blogComments >= 4 && responseJson.consecutiveDays>6);

      if (responseJson.refreshFlg == 'Y') {
        this.refreshUserObj(responseJson.user);
      }

    }

  }

}
