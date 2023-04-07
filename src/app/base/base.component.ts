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
  public minutesToRefresh = 1;
  public infoObj: any = null;
  public outOfSyncFlg: boolean = false;
  public geoError: string = '';


  public headerObj: any = {
    userId: 0, imgSrcFile: this.imgSrcFile, pageTitle: '',
    profileCompleteFlg: false,
    notifications: localStorage['notifications'] || 0,
    admirerCount: localStorage['admirerCount'] || 0,
    matchesAlerts: localStorage['matchesAlerts'] || 0
  };

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (!localStorage['code']) {
      this.errorMessage = 'Login out of sync! Please log out and log back in. Contact admin if problem persists.';
      this.outOfSyncFlg = true;
    } else
      this.loadUserObj();

    this.logUser();
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
  getDateObjFromJSDate(dt: string) {
    return getDateObjFromJSDate(dt);
  }

  getNotificationsTypesFromInfoObj(infoObj: any) {

    this.infoObj = infoObj;
    localStorage['infoObj'] = JSON.stringify(infoObj);
    localStorage['lastUpd'] = infoObj.lastUpd;
    if(infoObj.user)
      this.userStatus = infoObj.user.status;
    this.headerObj.chatPeople = infoObj.chatPeople;

    this.headerObj.admirerCount = infoObj.admirerCount;
    this.headerObj.messageCount = infoObj.messageCount;
    this.headerObj.matchesAlerts = infoObj.matchesAlerts
    this.headerObj.dateCount = infoObj.dateCount
    this.headerObj.ownerAlerts = infoObj.ownerAlerts
    this.headerObj.newReviewBy = infoObj.newReviewBy
    localStorage['admirerCount'] = this.headerObj.admirerCount;
    localStorage['messageCount'] = this.headerObj.messageCount;
    localStorage['matchesAlerts'] = this.headerObj.matchesAlerts;
    localStorage['dateCount'] = this.headerObj.dateCount;
    localStorage['ownerAlerts'] = this.headerObj.ownerAlerts;

    var notificationsTypes = [
      { name: 'Users Interested', amount: 0, desc: 'You have someone interested in you!' },
      { name: 'Users Matched', amount: 0, desc: 'You have a new match!' },
      { name: 'Questions Asked', amount: 0, desc: 'Someone has asked you a question!' },
      { name: 'Dates Requested', amount: 0, desc: 'Someone has requested a date!' },
      { name: 'Messages Received', amount: 0, desc: 'You have received new messages!' },
      { name: 'Info Requested', amount: 0, desc: 'Someone has requested your info!' },
      { name: 'Picture Requested', amount: 0, desc: 'Someone has requested your picture!' },
      { name: 'Picture Received', amount: 0, desc: 'Someone has sent you a picture!' },
      { name: 'Dropped', amount: 0, desc: 'Sorry, but someone has dropped you from their dating pool.' },
      { name: 'New Review', amount: 0, desc: 'Someone has written a new review on you!' },
    ];

    notificationsTypes[0].amount = infoObj.admirerCount;
    notificationsTypes[1].amount = infoObj.users_matched;
    notificationsTypes[3].amount = infoObj.dateRequestCount;
    notificationsTypes[4].amount = infoObj.messageCount;
    notificationsTypes[5].amount = infoObj.infoRequestCount;
    notificationsTypes[6].amount = infoObj.picRequestCount;
    notificationsTypes[7].amount = infoObj.newPicsCount;
    notificationsTypes[8].amount = (infoObj.droppedBy > 0) ? 1 : 0;
    notificationsTypes[9].amount = (infoObj.newReviewBy > 0) ? 1 : 0;

    var notifications = 0;
    notificationsTypes.forEach(element => {
      notifications += parseInt(element.amount.toString());
    });

    //console.log('+++++', infoObj, notifications);

    this.headerObj.notifications = notifications;
    localStorage['notifications'] = notifications;

    return notificationsTypes;
  }

  loadUserObj() {
    this.user = null;
    this.userId = localStorage['user_id'] || 0;
    this.userStatus = '';
    this.popupNum = 1;
    if (this.userId > 0) {
      if (localStorage['infoObj'])
        this.infoObj = JSON.parse(localStorage['infoObj']);

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
        this.headerObj.dateCount = localStorage['dateCount'];
        this.headerObj.ownerAlerts = localStorage['ownerAlerts'];
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

  changeMenuNum(num: number) {
    this.successFlg = false;
    if (num == this.menuNum)
      this.menuNum = 0;
    else
      this.menuNum = num;
  }

  ngClassMenuButton(num: number, menuNum: number) {
    if (num == menuNum)
      return 'btn btn-main-color';
    else
      return 'btn btn-secondary';
  }
  syncUserWithLocalStorage(responseJson: any) {
    var now = new Date();
    console.log('xxx user synced with database xxx', responseJson);
    if (responseJson.infoObj) {
      console.log('ownerAlerts', responseJson.infoObj.ownerAlerts)
      this.getNotificationsTypesFromInfoObj(responseJson.infoObj);
      localStorage['timeStamp'] = now.toString();
      localStorage['lastUpd'] = responseJson.infoObj.lastUpd;

      /*
      this.headerObj.notifications = responseJson.infoObj.notifications;
      this.headerObj.admirerCount = responseJson.infoObj.admirerCount;
      this.headerObj.messageCount = responseJson.infoObj.messageCount;
      this.headerObj.matchesAlerts = responseJson.infoObj.matchesAlerts
      this.headerObj.dateCount = responseJson.infoObj.dateCount
      this.headerObj.ownerAlerts = responseJson.infoObj.ownerAlerts

      this.infoObj = responseJson.infoObj;
      localStorage['infoObj'] = JSON.stringify(responseJson.infoObj);
      //console.log('hey!!', this.infoObj);
      localStorage['lastUpd'] = responseJson.infoObj.lastUpd;
      localStorage['timeStamp'] = now.toString();
      //this.notifications = responseJson.infoObj.notifications;
      this.headerObj.notifications = responseJson.infoObj.notifications;
      this.headerObj.admirerCount = responseJson.infoObj.admirerCount;
      this.headerObj.messageCount = responseJson.infoObj.messageCount;
      this.headerObj.matchesAlerts = responseJson.infoObj.matchesAlerts
      this.headerObj.dateCount = responseJson.infoObj.dateCount
      this.headerObj.ownerAlerts = responseJson.infoObj.ownerAlerts
      localStorage['notifications'] = this.headerObj.notifications;
      localStorage['admirerCount'] = this.headerObj.admirerCount;
      localStorage['messageCount'] = this.headerObj.messageCount;
      localStorage['matchesAlerts'] = this.headerObj.matchesAlerts;
      localStorage['dateCount'] = this.headerObj.dateCount;
      localStorage['ownerAlerts'] = this.headerObj.ownerAlerts;
      */
      //console.log('xxxdateCount', this.headerObj.dateCount);
      if (responseJson.user && responseJson.user.status == 'Active') {
        setTimeout(() => {
          this.checkServerForChanges(now.toString());
        }, 60 * this.minutesToRefresh * 1000);
      }
      if ((responseJson.infoObj.refreshFlg == 'Y' || responseJson.refreshFlg == 'Y') && responseJson.user)
        this.refreshUserObj(responseJson.user);
    }

  }

  getDataFromServer(action: string, fileName: string, bonusParams: any) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: action,
    };
    params = Object.assign(params, bonusParams);
    //console.log('xxxparams', params);
    this.executeApi(fileName, params, true);
  }

  checkServerForChanges(lastUpd: string) {
    var e = document.getElementById('logo');
    if (e && lastUpd == localStorage['timeStamp'] && this.user.status == 'Active') {
      this.minutesToRefresh *= 2;
      console.log('---relog---', this.minutesToRefresh);
      this.logUser();
    } else {
      this.minutesToRefresh = 1;
      console.log('--nolog--', this.user.status);
    }
  }
  populateGeoInfo() {
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
      console.log('>>>>>populateGeoInfo<<<<<', params);
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
    return 'https://www.betradating.com/betraPhp/';
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
    if (params.action != 'logUser')
      this.loadingFlg = true;
    this.apiExecutedFlg = true;
    //console.log('fetch...', file, params.action);
    fetch(url, postData).then((resp) => resp.text())
      .then((data) => {
        //console.log('response:', data);
        if (params.action != 'logUser')
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

          //console.log('responseJson', this.responseJson);
          if (this.responseJson && this.responseJson.status == 'Success') {
            this.postSuccessApi(file, this.responseJson);
          } else {
            console.log('Error!!', this.responseJson);
            var error = (this.responseJson && this.responseJson.error) ? this.responseJson.error : 'No Success status received from ' + file;
            this.postErrorApi(file, error, data);
          }
        }

      })
      .catch(error => {
        this.loadingFlg = false;
        this.postErrorApi(file, error, 'fetch error');
      });
  }

  postSuccessApi(file: string, responseJson: any) {
    if (responseJson) {
      console.log('+++postSuccessApi+++', responseJson.action, responseJson);
      this.successFlg = true;
      if (responseJson.action == 'logUser') {
        if (responseJson.refreshFlg == 'Y')
          this.syncUserWithLocalStorage(responseJson);
        else
          this.getNotificationsTypesFromInfoObj(responseJson.infoObj);
      }
    }
  }
  postErrorApi(file: string, error: string, data: string = '') {
    //    if (this.spinnerComponent) {
    //      this.spinnerComponent.show();
    //     this.spinnerComponent.setApiMessage(error);
    //   }
    this.loadingFlg = false;
    if (error == '')
      error = 'No success message returned';
    this.errorMessage = error;
    console.log('postErrorApi', error, data);
  }
  ngClassBox(flag: boolean) {
    return (flag) ? 'fa fa-check-square-o betra-checkbox' : 'fa fa-square-o betra-checkbox';
  }

  uploadCoordinates() {
    if (localStorage['latitude']) {
      var params = { latitude: localStorage['latitude'], longitude: localStorage['longitude'] }
      this.getDataFromServer('updateLat', 'geoScript.php', params);
    } else
      this.errorMessage = 'No Coordinates found. Try using a browser that supports geolocation.';
  }

  getLocation() {
    console.log('finding location', navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.browserGeolocationFail);
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.errorMessage = "Geolocation is not supported by this browser.";
    }
  }

  browserGeolocationFail(error: any) {
    console.log('error!', error);
    var e = document.getElementById('geoError');
    if (e) {
      e.innerHTML = error.message;
    }

    //tryAPIGeolocation();

    switch (error.code) {
      case error.TIMEOUT:
        break;
      case error.PERMISSION_DENIED:
        //       tryAPIGeolocation();
        break;
      case error.POSITION_UNAVAILABLE:
        break;
    }
  }

  showPosition(position: any) {
    console.log('here are the coordinates', position.coords.latitude, position.coords.longitude);
    localStorage['latitude'] = position.coords.latitude;
    localStorage['longitude'] = position.coords.longitude;
    //this.uploadCoordinates();
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

var tryAPIGeolocation = function () {
  $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function (success: any) {
    console.log(success.location.lat, success.location.lng);
  })
    .fail(function (err: any) {
      console.log('error!!', err);
    });
};