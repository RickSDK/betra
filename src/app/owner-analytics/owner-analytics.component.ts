import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-analytics',
  templateUrl: './owner-analytics.component.html',
  styleUrls: ['./owner-analytics.component.scss']
})
export class OwnerAnalyticsComponent extends BaseComponent implements OnInit {
  public statsArray:any = null;
  public totalsObj:any = {accounts: 0, city: 0, emailVerifyFlg: 0, match: 0, matches: 0,
    personality: 0, phone: 0, pic: 0, politics: 0, race: 0, swipes: 0}
  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getAnalytics', 'owners.php', {})
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getAnalytics') {
      this.statsArray = responseJson.statsArray;
      this.statsArray.forEach((element: any) => {
        this.totalsObj.accounts += element.accounts;
        this.totalsObj.city += element.city;
        this.totalsObj.emailVerifyFlg += element.emailVerifyFlg;
        this.totalsObj.match += element.match;
        this.totalsObj.matches += element.matches;
        this.totalsObj.personality += element.personality;
        this.totalsObj.phone += element.phone;
        this.totalsObj.pic += element.pic;
        this.totalsObj.politics += element.politics;
        this.totalsObj.race += element.race;
        this.totalsObj.rate += element.rate;
        this.totalsObj.swipes += element.swipes;
      });
      if(this.totalsObj.accounts>0)
        this.totalsObj.rate = Math.round(this.totalsObj.match * 100 / this.totalsObj.accounts);
    }
  }

}
