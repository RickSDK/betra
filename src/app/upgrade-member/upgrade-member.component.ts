import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-upgrade-member',
  templateUrl: './upgrade-member.component.html',
  styleUrls: ['./upgrade-member.component.scss']
})
export class UpgradeMemberComponent extends BaseComponent implements OnInit {
  public plans = [
    { name: '1 Month', cost: '$19.99/month', payment: '$2' },
    { name: '3 Months', cost: '$14.99/month', payment: '$44.97' },
    { name: '12 Months', cost: '$10.99/month', payment: '$131.88' },
  ];
  public benefitExpDate: string = '';
  public cardOnFile: string = '';
  public showUpgradeFlg: boolean = true;
  public showPlanDetailsFlg: boolean = true;
  public creditObj: any = null

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.showPlanDetailsFlg = !this.user.memberFlg;
    this.getDataFromServer('getCreditCardInfo', 'payments.php', {});
  }

  setAutoRenew(value: string) {
    this.creditObj.autoRenewFlg = value;
    this.getDataFromServer('setCreditCardRenew', 'payments.php', { autoRenewFlg: value });
  }

  override postSuccessApi(file: string, responseJson: any) {
    //    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == "getCreditCardInfo") {
      //this.benefitExpDate = this.localDateFrommySqlDate(responseJson.creditObj.expiration);
      if (responseJson.creditObj.expiration) {
        var dt = this.getDateObjFromJSDate(responseJson.creditObj.expiration);
        this.benefitExpDate = dt.localDate + ' (' + (dt.daysAgo * -1) + ' days remaining)';
      } else
        this.benefitExpDate = 'Never expire';
      this.cardOnFile = '';
      if (responseJson.creditObj && responseJson.creditObj.card_number && responseJson.creditObj.card_number.length > 12)
        this.cardOnFile = '**** **** **** ' + responseJson.creditObj.card_number.substr(-4, 4);
      this.creditObj = responseJson.creditObj;
    }
  }

}
