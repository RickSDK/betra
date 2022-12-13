import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';

declare var $: any;
declare var betraImageFromId: any;
declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public userId: number = 0;
  public apiMessage: string = '';
  public loadingFlg: boolean = false;
  public apiExecutedFlg: boolean = false;
  public errorMessage: string = '';
  public changesMadeFlg = false;
  public successFlg = false;
  public displayYear = new Date().getFullYear();
  public popupNum: number = 1;
  public user: any;
  public imgSrc: string = 'assets/images/theRock.png';
  public imgSrcFile: string = 'assets/images/theRock.png';
  public apiSuccessFlg: boolean = false;
  public responseJson: any = null;
  public userStatus: string = '';
//  public notifications: number = 0;
  public menuNum: number = 0;
  public topButtons: any = ['one', 'two', 'three'];


  public headerObj: any = {
    userId: 0, imgSrcFile: this.imgSrcFile, pageTitle: '',
    profileCompleteFlg: false,
    notifications: localStorage['notifications'] || 0,
    admirerCount: localStorage['admirerCount'] || 0,
    matchesAlerts: localStorage['matchesAlerts'] || 0
  };

  constructor() { }

  ngOnInit(): void {
    if (!localStorage['code']) {
      this.errorMessage = 'Login out of sync! Please log out and log back in. Contact admin if problem persists.';
    }
    this.loadUserObj();
    //this.notifications = localStorage['notifications'];

  }
  refreshUserObj(userObj: any) {
    if (userObj && userObj.user_id > 0) {
      localStorage['User'] = JSON.stringify(userObj);
      this.user = new User(userObj);
      console.log('user refreshed!', this.user);
    } else {
      console.log('invalid object sent to refresh!!!');
    }
  }
  betraImageFromId(user_id: number, profilePic: number) {
    return betraImageFromId(user_id, profilePic);
  }
  localDateFrommySqlDate(dt: string) {
    var dtObj = getDateObjFromJSDate(dt);
    return dtObj.localDate;
  }
  loadUserObj() {
    this.user = null;
    this.userId = localStorage['user_id'] || 0;
    this.userStatus = '';
    this.popupNum = 1;
    console.log('+++ loading this user: ', this.userId);
    if (this.userId > 0) {
      var userLocalStorage = localStorage['User'];
      if (userLocalStorage) {
        var userObj = JSON.parse(localStorage['User']);
        this.user = new User(userObj);
        this.imgSrcFile = this.user.imgSrc;
        this.userStatus = this.user.status;
        this.headerObj.profileCompleteFlg = !!(this.user && this.user.status == 'Active');
        this.headerObj.notifications = localStorage['notifications'];
        this.headerObj.messageCount = localStorage['messageCount'];
        this.headerObj.admirerCount = localStorage['admirerCount'];
        this.headerObj.matchesAlerts = localStorage['matchesAlerts'];
        this.headerObj.ownerFlg = this.user.ownerFlg;
        this.popupNum = (this.user.status == 'Active') ? 0 : 3;
        console.log('loadUserObjUser', this.user);
      } else {
        console.log('Error - no localstorage!!!');
        this.userId = 0;
        localStorage['user_id'] = 0;
      }
    }
  }
  ngClassMenuButton(num: number, menuNum: number) {
    if (num == menuNum)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }
  syncUserWithLocalStorage(responseJson: any) {
    var now = new Date();
    console.log('xxx user synced with database xxx', responseJson);
    if (responseJson.infoObj) {
      localStorage['lastUpd'] = responseJson.infoObj.lastUpd;
      localStorage['timeStamp'] = now.toString();
      //this.notifications = responseJson.infoObj.notifications;
      this.headerObj.notifications = responseJson.infoObj.notifications;
      this.headerObj.admirerCount = responseJson.infoObj.admirerCount;
      this.headerObj.messageCount = responseJson.infoObj.messageCount;
      this.headerObj.matchesAlerts = responseJson.infoObj.matchesAlerts
      localStorage['notifications'] = this.headerObj.notifications;
      localStorage['admirerCount'] = this.headerObj.admirerCount;
      localStorage['messageCount'] = this.headerObj.messageCount;
      localStorage['matchesAlerts'] = this.headerObj.matchesAlerts;
      setTimeout(() => {
        this.checkServerForChanges(now.toString());
      }, 60 * 4 * 1000);
      if (responseJson.infoObj.refreshFlg == 'Y' && responseJson.user)
        this.refreshUserObj(responseJson.user);
    }

  }
  checkServerForChanges(lastUpd: string) {
    var e = document.getElementById('logo');
    if(e && lastUpd == localStorage['timeStamp']) {
      this.logUser();
    } else {
      console.log('nolog');
    }
  }
  populateGeoInfo() {
    console.log('populateGeoInfo');
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
      console.log('populateGeoInfo', params);
      this.executeApi('geoScript.php', params, true);
    });
  }
  logUser(refreshFlg: string = '') {
    var uid = localStorage['user_id'];
    var email = localStorage['email'];
    var code = localStorage['code'];

    if (uid > 0 && email && code) {
      var params = {
        userId: localStorage['user_id'],
        email: localStorage['email'],
        code: localStorage['code'],
        action: 'logUser',
        lastUpd: localStorage['lastUpd'],
        refreshFlg: refreshFlg
      };
      console.log('params', params);
      this.executeApi('appApiCode.php', params, true);
    }
  }
  loginClicked(event: any) {
    console.log('loginClicked!!', event);
    if (!event)
      this.popupNum = 2;
    if (event == 'logout')
      this.loadUserObj();
  }

  getHostname() {
    return 'https://www.appdigity.com/betraPhp/';
  }
  selectValueChanged() {
    this.changesMadeFlg = true;
  }
  getAPIData(user: any, action: string, noCacheFlg: boolean) {
    var params = {
      userId: user.id,
      code: user.code,
      action: action
    };
    this.executeApi('festApi.php', params, true);
  }
  executeApi(file: string, params: any = null, displaySuccessFlg: boolean = false) {
    if (!params) {
      params =
      {
        Username: localStorage['email'],
        code: localStorage['code']
      };
    }
    this.errorMessage = '';
    var url = this.getHostname() + file;
    var postData = getPostDataFromObj(params);
    this.loadingFlg = true;
    this.apiExecutedFlg = true;
    console.log('fetch...', file);
    fetch(url, postData).then((resp) => resp.text())
      .then((data) => {
        //console.log('response:', data);
        this.loadingFlg = false;
        if (!data) {
          this.postErrorApi(file, 'No reponse received.');
        } else {
          //console.log('data', data);
          this.responseJson = null;
          try {
            this.responseJson = JSON.parse(data);
          } catch (e) {
            console.log('error!', e);
          }

          console.log('responseJson', this.responseJson);
          if (this.responseJson && this.responseJson.status == 'Success') {
            this.postSuccessApi(file, this.responseJson);
          } else {
            console.log('Error!!', this.responseJson);
            var error = (this.responseJson && this.responseJson.error) ? this.responseJson.error : 'No Success status received from ' + file;
            this.postErrorApi(file, error);
          }
        }

      })
      .catch(error => {
        this.loadingFlg = false;
        this.postErrorApi(file, error);
      });
  }

  postSuccessApi(file: string, responseJson: any) {
    console.log('postSuccessApi', responseJson);
    //    if (this.spinnerComponent)
    //      this.spinnerComponent.setApiMessage('Success!');
  }
  postErrorApi(file: string, error: string) {
    //    if (this.spinnerComponent) {
    //      this.spinnerComponent.show();
    //     this.spinnerComponent.setApiMessage(error);
    //   }
    this.loadingFlg = false;
    if (error == '')
      error = 'No success message returned';
    this.errorMessage = error;
    console.log('postErrorApi', error);
  }
  ngClassBox(flag: boolean) {
    return (flag) ? 'fa fa-check-square-o betra-checkbox' : 'fa fa-square-o betra-checkbox';
  }


}
function getPostDataFromObj(obj: any) {
  var body = JSON.stringify(obj);

  const postData = {
    method: 'POST',
    headers: new Headers(),
    body: body
  };
  return postData;
}