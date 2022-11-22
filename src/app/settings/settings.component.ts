import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {
  public showStatsFlg: boolean = false;
  public showLocationFlg: boolean = false;
  public showUpgradeFlg: boolean = false;

  constructor(private router: Router) { super(); }

  logout() {
    this.userId = 0;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.router.navigate(['']);
  }

  showStats() {
    this.showStatsFlg = true;
    this.getStats();
  }
  getStats() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getStats"
    };
    console.log(params);
    this.executeApi('appApiCode2.php', params, true);
  }
  updateLocation() {
    this.loadingFlg = true;
    this.populateGeoInfo();
  }
  showLocation() {
    this.showLocationFlg = !this.showLocationFlg;
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'updateGeoInfo') {
      this.user.city = responseJson.user.city;
      this.user.state = responseJson.user.state;
      this.user.countryName = responseJson.user.countryName;
      this.syncUserWithLocalStorage(responseJson);
    }
  }
}
