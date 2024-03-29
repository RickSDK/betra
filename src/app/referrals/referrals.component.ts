import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent extends BaseComponent implements OnInit {
  public users: any = [];
  public textCopiedFlg: boolean = false;
  public referralText: string = '';
  public selectedUser: any = null;
  public referredUsers:any = [];

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.referralText = 'https://www.betradating.com/#/?referralId=' + this.userId;
    this.getDataFromServer('getReferralUsers', 'appApiCode.php', {});
  }

  copyText() {
    // Copy the text inside the text field
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(this.referralText);
      this.textCopiedFlg = true;
    }

  }

  loadReferredMembers(user: any) {
    this.referredUsers = [];
    this.selectedUser = user;
    this.getDataFromServer('loadReferredMembers', 'owners.php', { uid: user.user_id });
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getReferralUsers') {
      this.users = responseJson.users;
    }
    if (responseJson.action == 'loadReferredMembers') {
      this.referredUsers = responseJson.users;
    }
  }
}
