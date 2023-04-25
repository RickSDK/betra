import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-reputation',
  templateUrl: './reputation.component.html',
  styleUrls: ['./reputation.component.scss']
})
export class ReputationComponent extends BaseComponent implements OnInit {
  public items = [
    { id: 1, name: 'Email', score: 0, icon: 'fa fa-envelope' },
    { id: 2, name: 'Phone', score: 0, icon: 'fa fa-phone' },
    { id: 3, name: 'Picture', score: 0, icon: 'fa fa-certificate' },
    { id: 4, name: 'Location', score: 0, icon: 'fa fa-globe' },
    { id: 5, name: 'Facebook', score: 0, icon: 'fa fa-facebook-square' },
    { id: 6, name: 'Instagram', score: 0, icon: 'fa fa-instagram' },
    { id: 7, name: 'Linked-in', score: 0, icon: 'fa fa-linkedin-square' },
  ];
  public selectedItemNum: number = 0;
  public facebookUrl: string = '';
  public instragramUrl: string = '';
  public linkedInUrl: string = '';
  public updateSuccessfulFlg: boolean = false;

  public value: string = '';
  public searchLocFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getReputationStats', 'reputation.php', {})
    if (this.user.emailVerifyFlg)
      this.items[0].score = 1;
    if (this.user.picCertificateFlg)
      this.items[2].score = 1;
    if (this.user.navLat && this.user.navLat.length > 0)
      this.items[3].score = 1;

    if (this.user.facebookUrlFlg)
      this.items[4].score = 1;
  }
  editItemNum(num: number) {
    this.selectedItemNum = (this.selectedItemNum == num) ? 0 : num;

    this.value = '';
    if (this.selectedItemNum == 5)
      this.value = this.facebookUrl;
    if (this.selectedItemNum == 6)
      this.value = this.instragramUrl;
    if (this.selectedItemNum == 7)
      this.value = this.linkedInUrl;
  }
  textValueSubmitted(value: string) {
    var type = this.items[this.selectedItemNum - 1].name;
    this.getDataFromServer('postReputationUrl', 'reputation.php', { value: value, type: type });
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'updateLat') {
      this.selectedItemNum = 0;
      this.updateSuccessfulFlg = true;
      this.refreshUserObj(responseJson.user);
      this.getDataFromServer('getReputationStats', 'reputation.php', {})
    }
    if (responseJson.action == 'postReputationUrl') {
      this.selectedItemNum = 0;
      this.updateSuccessfulFlg = true;
      this.getDataFromServer('getReputationStats', 'reputation.php', {})
    }
    if (responseJson.action == 'getReputationStats') {
      this.facebookUrl = responseJson.facebookUrl;
      this.instragramUrl = responseJson.instragramUrl;
      this.linkedInUrl = responseJson.linkedInUrl;

      if (responseJson.emailVerifyFlg == 'Y')
        this.items[0].score = 1;
      if (responseJson.picCertificateFlg == 'Y')
        this.items[2].score = 1;
      if (responseJson.navLat && responseJson.navLat.length > 0)
        this.items[3].score = 1;

      if (responseJson.facebookUrlFlg == 'Y')
        this.items[4].score = 1;
      if (responseJson.instragramUrlFlg == 'Y')
        this.items[5].score = 1;
      if (responseJson.linkedInUrlFlg == 'Y')
        this.items[6].score = 1;

      var reputationsScore = 0;
      this.items.forEach(element => {
        reputationsScore += element.score;
      });
      if (reputationsScore > this.user, reputationsScore)
        this.user.reputationsScore = reputationsScore;
    }
  }

  verifyLocation() {
    this.searchLocFlg = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showLocalPosition, this.errorCallback, { timeout: 10000 });
    } else {
      this.errorMessage = "Geolocation is not supported by this browser.";
    }
  }
  showLocalPosition(position: any) {
    console.log('here are the coordinates', position.coords.latitude, position.coords.longitude);
    localStorage['latitude'] = position.coords.latitude;
    localStorage['longitude'] = position.coords.longitude;

    var e1 = document.getElementById("latitude");
    if (e1)
      e1.innerHTML = position.coords.latitude;

    var e2 = document.getElementById("longitude");
    if (e2)
      e2.innerHTML = position.coords.longitude;

    var e = document.getElementById("gpsMessage");
    if (e)
      e.innerHTML = 'Your loc: ' + position.coords.latitude;

  }
  errorCallback(error: any) {
    var errorMessage = (error && error.message) ? error.message : "Unable to locate your position.";
    var e = document.getElementById("gpsMessage");
    if (e)
      e.innerHTML = errorMessage;
  }
  uploadCoords() {
    var latitude = localStorage['latitude'];
    var longitude = localStorage['longitude'];
    if (!latitude || !longitude) {
      this.errorMessage = 'Sorry, no coordinates found. Try using a different device or browser';
    } else {
      this.getDataFromServer('updateLat', 'geoScript.php', { latitude: latitude, longitude: longitude });
    }
  }

}
