import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent extends BaseComponent implements OnInit {
  public users: any = [];
  public textCopiedFlg: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getReferralUsers', 'appApiCode.php', {});
  }

  copyText() {
    var copyText = 'https://www.betradating.com?referralId=' + this.userId;
    // Copy the text inside the text field
    if(navigator && navigator.clipboard) {
      navigator.clipboard.writeText(copyText);
      this.textCopiedFlg = true;
    }

  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getReferralUsers') {
      this.users = responseJson.users;
    }
  }
}
