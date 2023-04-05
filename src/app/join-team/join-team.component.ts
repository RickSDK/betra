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
    { number: 5, name: 'VP', percent: '4%', spots: 4, payouts: '$4,000' },
    { number: 4, name: 'Director', percent: '3%', spots: 8, payouts: '$3,000' },
    { number: 3, name: 'Manager', percent: '2%', spots: 8, payouts: '$2,000' },
    { number: 2, name: 'Lead', percent: '1%', spots: 16, payouts: '$1,000' },
    { number: 1, name: 'Owner', percent: '0.5%', spots: 32, payouts: '$500' }
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
    console.log(this.userId, this.user);
    if(!this.user || this.userId==0) {
      this.errorMessage = 'Error - You must first create an account and sign into it. Click "Create a Betra account" link above to get started.';
      return;  
    }
    if(this.user && this.user.status != 'Active') {
      this.errorMessage = 'Error - Make sure you fully complete your profile. Click "Profile" link above to get finish.';
      return;  
    }
    this.signupDisabledFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "ownerSignup"
    };
    this.executeApi('owners.php', params, true);

  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', responseJson);
    this.responseJson = responseJson;
    if (responseJson.action == 'ownerSignup') {
      this.router.navigate(['']);
    }
    if (responseJson.action == 'getOwnerCount' || responseJson.action == 'getMyOwnerInfo' ) {
      this.ownerCount = responseJson.ownerCount;
      this.spotsLeft = 62 - this.ownerCount;
      if(responseJson.refreshFlg && responseJson.refreshFlg == 'Y') {
        this.refreshUserObj(responseJson.user);
      }
    }
  }
}
