import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

declare var getVersion: any;
declare var getBrowser: any;
declare var getPlatform: any;
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {
  public showUpgradeFlg: boolean = false;

  public geoUpdatedFlg: boolean = false;
  public version: string = '';
  public browser: string = '';
  public platform: string = '';
  public updateLocationDisabledFlg: boolean = true;
  public findingLocationDataFlg: boolean = false;
  public city: string = '';
  public state: string = '';
  public country: string = '';
  public lat1: string = '';
  public lng1: string = '';
  public lat2: string = '';
  public lng2: string = '';
  public ip: string = '';
  public gpsDataError: string = '';
  public buddyEmail: string = '';
  public announcement: string = '';

  constructor(private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.version = getVersion();
    this.browser = getBrowser();
    this.platform = getPlatform();

    this.lat2 = localStorage['latitude'];
    this.lng2 = localStorage['longitude'];

  }

  logout() {
    this.userId = 0;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.router.navigate(['']);
  }

  showStats() {
    this.menuNum = 1;
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

  changeBuddy() {
    this.getDataFromServer('getBuddyEmail', 'appApiCode.php', []);
  }

  updateBuddyEmail() {
    var params = { buddyEmail: $('#buddyEmail').val() };
    this.getDataFromServer('updateBuddyEmail', 'appApiCode.php', params);
  }
  updateLocation() {
    this.gpsDataError = "";
    var e = document.getElementById("gpsDataError");
    if (e)
      e.innerHTML = '';

    this.loadingFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      city: this.city,
      countryName: this.country,
      latitude: this.lat1,
      longitude: this.lng1,
      navLat: localStorage['latitude'],
      navLng: localStorage['longitude'],
      state: this.state,
      action: "updateNewGeoInfo"
    };
    console.log('populateGeoInfo', params);
    this.getDataFromServer('updateNewGeoInfo', 'geoScript.php', params);

  }

  resetMatchesPressed() {
    this.loadingFlg = true;
    this.menuNum = 0;
    var params = {
      resetRange: $('#resetRange').val()
    }
    this.getDataFromServer('resetMatches', 'appApiCode.php', params);
  }

  updatePassword() {
    this.errorMessage = '';
    var newPassword = $('#newPassword').val();
    if(!newPassword) {
      this.errorMessage = 'Enter a password';
      return;
    }
    var params = {
      newPassword: newPassword
    }
    this.getDataFromServer('updatePassword', 'appApiCode.php', params);
 
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'updatePassword') {
      this.menuNum = 0;
      this.errorMessage = 'Password has been successfully changed';
      localStorage['savedPassword'] = responseJson.newPassword;
      localStorage['savedCode'] = btoa(responseJson.newPassword); 
      localStorage['code'] = btoa(responseJson.newPassword);
    }
    if (responseJson.action == 'updateBuddyEmail') {
      this.menuNum = 0;
    }
    if (responseJson.action == 'getBuddyEmail') {
      this.buddyEmail = responseJson.buddyEmail;
      this.menuNum = 5;
    }
    if (responseJson.action == 'resetMatches') {
      this.announcement = 'Your Matches have been reset. Click the browse link to continue.';
    }
    if (responseJson.action == 'updateLat' || responseJson.action == 'updateNewGeoInfo') {
      this.user.navLat = responseJson.user.navLat;
      this.user.navLng = responseJson.user.navLng;
      this.syncUserWithLocalStorage(responseJson);
      this.geoUpdatedFlg = true;
    }
    if (responseJson.action == 'updateGeoInfo') {
      this.user.city = responseJson.user.city;
      this.user.state = responseJson.user.state;
      this.user.countryName = responseJson.user.countryName;
      this.user.lat = responseJson.user.lat;
      this.user.lng = responseJson.user.lng;
      this.syncUserWithLocalStorage(responseJson);
    }
  }
  showLocalPosition(position: any) {
    console.log('here are the coordinates', position.coords.latitude, position.coords.longitude);
    localStorage['latitude'] = position.coords.latitude;
    localStorage['longitude'] = position.coords.longitude;

    var e = document.getElementById("lat2");
    if (e)
      e.innerHTML = position.coords.latitude;
    //this.uploadCoordinates();
  }
  checkDisabledButton() {
    if (!this.lat1)
      this.gpsDataError = "unable to get your location. Try logging in using adifferent browser or change your settings.";

    this.updateLocationDisabledFlg = (this.user.city == this.city && this.user.state == this.state && this.user.countryName == this.country && this.user.gpsLat == this.lat1 && this.user.navLat == this.lat2);
    this.findingLocationDataFlg = false;
  }
  errorCallback() {
    var e = document.getElementById("gpsDataError");
    if (e)
      e.innerHTML = 'Navigator was not able to get your exact position, but will use your gps1 position for locating singles.';
  }
  findLocalData() {
    this.gpsDataError = '';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showLocalPosition, this.errorCallback, { timeout: 10000 });
    } else {
      this.gpsDataError = "Geolocation is not supported by this browser.";
    }
    this.populateGeoInfo();

    this.lat2 = localStorage['latitude'];

    this.findingLocationDataFlg = true;
    $.getJSON('https://ssl.geoplugin.net/json.gp?k=cee1887eb4490f28', (data: any) => {
      this.city = data.geoplugin_city;
      this.state = data.geoplugin_regionCode;
      this.country = data.geoplugin_countryName;
      this.lat1 = data.geoplugin_latitude;
      this.lng1 = data.geoplugin_longitude;
      this.ip = data.geoplugin_request;
      this.updateLocationDisabledFlg = (this.user.city == this.city && this.user.state == this.state && this.user.countryName == this.country && this.user.gpsLat == this.lat1 && (!this.lat2 || this.user.navLat == this.lat2));
      setTimeout(() => {
        this.checkDisabledButton();
      }, 2000);

    });

  }
}
