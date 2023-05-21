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
  public locDist: number = 99;
  public databaseLatitude: number = 0;
  public locationPage: any = null;
  public ipRegistry: any = {};
  public googleApiObj: any = {};
  public geopluginObj: any = {};
  public showGPSFlg: boolean = false;
  public noGoodOptionsFlg = true;
  public override topButtons:any = ['Navigator', 'GeoPlugin', 'IPRegistry'];

  constructor(public zone: NgZone, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
    this.showGPSFlg = this.user.user_id == 1;
    this.checkValues();

    this.findLocationUsingNavigator();
    this.findGeoInfo();
    this.ipregistryLocation();

  }


  findIPRegistryLocation() {
    this.ipregistryLocation();
  }

  updateIpregistryLocation2() {
    var params = {
      city: localStorage['ipr_city'],
      latitude: localStorage['ipr_latitude'],
      longitude: localStorage['ipr_longitude'],
      postal: localStorage['ipr_postal'],
      stateName: localStorage['ipr_region'],
      countryName: localStorage['ipr_country'],
      countryCode: localStorage['ipr_country_code'],
      state: localStorage['ipr_region_code'],
      locationNum: 3
    }
    this.getDataFromServer('updateIpregistryLocation2', 'geoScript.php', params);
    console.log(params);
  }

  findLocationUsingNavigator() {
    this.loadingFlg = true;
    this.getLocationUsingNavigatorGeolocation();

    setTimeout(() => {
      var latitude = localStorage['latitude'];
      var longitude = localStorage['longitude'];
      console.log('xxx', latitude, longitude);
      if(latitude != "")
        this.getGoogleAPILoc(latitude, longitude);      
    }, 1000);
    setTimeout(() => {
      this.checkValues();
      this.loadingFlg = false;
    }, 2000);
  }

  updateGps() {
    var params = { latitude: localStorage['latitude'], longitude: localStorage['longitude'], city: localStorage['city'], state: localStorage['state'], stateName: localStorage['stateName'], countryName: localStorage['countryName'], countryCode: localStorage['countryCode'], locationNum: 1 };
    console.log(params);
    this.getDataFromServer('updateNavigatorLocation', 'geoScript.php', params);
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
    this.ipRegistry.ipr_region_code = localStorage['ipr_region_code'];
    this.ipRegistry.ipr_country = localStorage['ipr_country'];
    this.ipRegistry.ipr_country_code = localStorage['ipr_country_code'];

    this.googleApiObj.city = localStorage['city'];
    this.googleApiObj.state = localStorage['state'];
    this.googleApiObj.stateName = localStorage['stateName'];
    this.googleApiObj.country = localStorage['country'];
    this.googleApiObj.countryCode = localStorage['countryCode'];
    
    //this.setLocationOption();

    //console.log('checkValues', this.ipRegistry);
  }

  updateGeoPluginInfo() {
//    this.populateGeoInfo();
    var params = {
      latitude: this.geopluginObj.latitude,
      longitude: this.geopluginObj.longitude,
      city: this.geopluginObj.city,
      countryCode: this.geopluginObj.countryCode,
      countryName: this.geopluginObj.countryName,
      region: this.geopluginObj.region,
      state: this.geopluginObj.state,
      stateName: this.geopluginObj.stateName,
      locationNum: 2,
    }
    console.log(params);
    this.getDataFromServer('updateGeoPluginInfo', 'geoScript.php', params);
  }

  findGeoPluginLocation() {
    this.findGeoInfo();
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
      //this.setLocationOption();
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if(responseJson.action ==  'updateNavigatorLocation' || responseJson.action == 'updateGeoPluginInfo' || responseJson.action == 'updateIpregistryLocation2') {
      this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'updateGoogleAPILoc') {
      this.getDataFromServer('getLocationInfo', 'geoScript.php', {});
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'getLocationInfo') {
      this.locationPage = responseJson;
      if(responseJson.locationNum>0)
        this.menuNum = responseJson.locationNum-1;

      var lat1 = parseFloat(localStorage['latitude'] || 0);
      this.locDist = Math.round(Math.abs((lat1 - this.responseJson.navLat) * 10000));
      console.log('locDist!!!!', this.locDist, this.responseJson.navLat, lat1);


    }
  }

}
