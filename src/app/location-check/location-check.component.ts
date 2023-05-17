import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-location-check',
  templateUrl: './location-check.component.html',
  styleUrls: ['./location-check.component.scss']
})
export class LocationCheckComponent extends BaseComponent implements OnInit {
  public latitudeFlg = !!(localStorage['latitude'] && localStorage['latitude'] != '');
  public latitude = localStorage['latitude'];
  public longitude = localStorage['longitude'];
  ////  public localCity: string = '';
  //  public localLat: string = '';
  //  public localLng: string = '';
  public locDist: number = 99;
  public databaseLatitude: number = 0;
  public locationPage: any = null;
  public ipRegistry: any = {};
  public googleApiObj: any = {};
  public geopluginObj: any = {};
  public showLocationOption: number = 3;
  public showGPSFlg: boolean = false;

  constructor(public zone: NgZone, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getLocation();
    this.findGeoInfo();
    this.ipregistryLocation();

    this.setLocationOption();

    this.getGoogleAPILoc(this.user.latitude, this.user.longitude);

    this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
    setTimeout(() => {
      this.checkValues();
    }, 2000);
  }

  setLocationOption() {
    console.log('setLocationOption', localStorage['ipr_latitude'], this.geopluginObj.city, this.googleApiObj.city, this.latitude);
    if (localStorage['ipr_latitude'])
      this.showLocationOption = 2;

    if (this.geopluginObj.latitude)
      this.showLocationOption = 1;

    if(this.googleApiObj.city && this.latitude)
      this.showLocationOption = 0;
  }

  findLocation() {
    this.loadingFlg = true;
    this.getLocation();
    setTimeout(() => {
      this.checkValues();
      this.loadingFlg = false;
    }, 2000);
  }

  updateGps() {
    this.loadingFlg = true;
    this.updateGoogleAPILoc();
    //setTimeout(() => {
    //this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
    //}, 1000);
  }

  checkValues() {
    this.latitudeFlg = !!(localStorage['latitude'] && localStorage['latitude'] != '');
    this.latitude = localStorage['latitude'];
    this.longitude = localStorage['longitude'];

    this.ipRegistry.ipr_city = localStorage['ipr_city'];
    this.ipRegistry.ipr_latitude = localStorage['ipr_latitude'];
    this.ipRegistry.ipr_longitude = localStorage['ipr_longitude'];
    this.ipRegistry.ipr_postal = localStorage['ipr_postal'];
    this.ipRegistry.ipr_region = localStorage['ipr_region'];

    this.googleApiObj.city = localStorage['city'];
    this.googleApiObj.state = localStorage['state'];
    this.googleApiObj.stateName = localStorage['stateName'];
    this.googleApiObj.country = localStorage['country'];

    this.setLocationOption();

    console.log('checkValues', this.ipRegistry);
  }

  updateGeoPluginInfo() {
    this.loadingFlg = true;
    this.populateGeoInfo();
    setTimeout(() => {
      this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
    }, 1000);
  }

  findGeoInfo() {
    console.log('>>>>>populateGeoInfo<<<<<');
    //https://ssl.geoplugin.net/json.gp?k=cee1887eb4490f28
    //http://www.geoplugin.net/json.gp?jsoncallback=?
    $.getJSON('https://ssl.geoplugin.net/json.gp?k=cee1887eb4490f28', (data: any) => {
      this.geopluginObj = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        city: data.geoplugin_city,
        continentName: data.geoplugin_continentName,
        countryCode: data.geoplugin_countryCode,
        countryName: data.geoplugin_countryName,
        currencyCode: data.geoplugin_currencyCode,
        currencySymbol: data.geoplugin_currencySymbol,
        latitude: data.geoplugin_latitude,
        longitude: data.geoplugin_longitude,
        region: data.geoplugin_region,
        state: data.geoplugin_regionCode,
        stateName: data.geoplugin_regionName,
        ip: data.geoplugin_request,
        action: "updateGeoInfo"
      };

      console.log('>>>>>populateGeoInfo<<<<<', this.geopluginObj);
      this.setLocationOption();
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action == 'updateGoogleAPILoc') {
      this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'getLocationInfo') {
      this.locationPage = responseJson;

      var lat1 = parseFloat(localStorage['latitude'] || 0);
      this.locDist = Math.round(Math.abs((lat1 - this.responseJson.navLat) * 10000));
      console.log('locDist!!!!', this.locDist, this.responseJson.navLat, lat1);


    }
  }

}
