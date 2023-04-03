import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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
  public localCity: string = '';
  public localLat: string = '';
  public localLng: string = '';

  constructor(public zone: NgZone) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getLocation();
    this.findGeoInfo();
    this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getLocationInfo') {
    }
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
    this.uploadCoordinates();
    setTimeout(() => {
      this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
    }, 1000);
  }

  checkValues() {
    this.latitudeFlg = !!(localStorage['latitude'] && localStorage['latitude'] != '');
    this.latitude = localStorage['latitude'];
    this.longitude = localStorage['longitude'];
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
      var params = {
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
      //this.zone.run(() => this.localCity = params.city);
      this.localCity = params.city;
      this.localLat = params.latitude;
      this.localLng = params.longitude;
      console.log('>>>>>populateGeoInfo<<<<<', params);
    });
  }



}
