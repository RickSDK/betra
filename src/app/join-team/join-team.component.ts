import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent extends BaseComponent implements OnInit {
  public signupDisabledFlg: boolean = false;
  public ownerCount: number = 0;
  public spotsLeft: number = 0;

  public levels = [
    { number: 6, name: 'President', percent: '5%', spots: 1, payouts: '$5,000' },
    { number: 5, name: 'VP', percent: '5%', spots: 2, payouts: '$5,000' },
    { number: 4, name: 'Director', percent: '4%', spots: 2, payouts: '$4,000' },
    { number: 3, name: 'Manager', percent: '2%', spots: 8, payouts: '$2,000' },
    { number: 2, name: 'Dev Team', percent: '2%', spots: 6, payouts: '$2,000' },
    { number: 1, name: 'Owner', percent: '0.5%', spots: 30, payouts: '$500' }
  ]

  constructor(private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.signupDisabledFlg = (!this.user || this.user.user_id == 0 || this.user.status != 'Active');
    if (this.user && this.user.user_id > 0)
      this.getMyOwnerInfo();
    else
      this.getOwnerCount()
  }
  getMyOwnerInfo() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getMyOwnerInfo",
      zone: this.user.adminZone
    };
    console.log('params', params);
    this.executeApi('owners.php', params, true);
  }
  getOwnerCount() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getOwnerCount"
    };
    this.executeApi('owners.php', params, true);
  }
  signupPressed() {
    this.signupDisabledFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "ownerSignup"
    };
    this.executeApi('owners.php', params, true);

  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'ownerSignup') {
      this.router.navigate(['']);
    }
    if (responseJson.action == 'getOwnerCount' || responseJson.action == 'getMyOwnerInfo' ) {
      this.ownerCount = responseJson.ownerCount;
      this.spotsLeft = 68 - this.ownerCount;
      if(responseJson.refreshFlg && responseJson.refreshFlg == 'Y') {
        console.log('refresh!');
        this.refreshUserObj(responseJson.user);
      }
    }
  }
}
