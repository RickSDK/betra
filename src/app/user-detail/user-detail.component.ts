import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { Router } from '@angular/router';
import { UserCommunicationComponent } from '../user-communication/user-communication.component';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent);
  @ViewChild(UserCommunicationComponent) messagesModal: UserCommunicationComponent = new (UserCommunicationComponent);

  public uid: number = 0;
  public id: number = 0;
  public pageTitle = 'User Detail';
  public matchUser: any = null;
  public calculatingStatsFlg = true;
  public matchObj = { status: 'not started', matchesFound: 0, progressPercent: 0, currentMatch: 0 };
  public playerList: any = [];
  public currentProfileIndex = 0;
  public exceededPoolSizeFlg: boolean = false;
  public showMatchLevelInfoFlg: boolean = false;
  public showFakePicOptionsFlg: boolean = false;
  public distance: string = '99';



  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.user)
      return;
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
      this.id = params['id'] || 0;
      this.exceededPoolSizeFlg = this.user.datingPool.length > 8;

      if (this.uid > 0)
        this.loadThisUser();
      else if (this.id == 4) {
        this.pageTitle = 'Admirers';
        this.browseSingles('getMyAdmirers');
      } else if (this.id == 5) {
        this.pageTitle = 'Online Today';
        this.browseSingles('getOnlineSingles');
      } else if (this.id == 7) {
        this.pageTitle = 'Verify Pic';
        this.verifyPictures();
      } else {
        this.pageTitle = 'Browse';
        this.browseSingles('findMatches');
      }
    })
  }
  browseSingles(action: string) {
    if (this.exceededPoolSizeFlg || this.user.showHeartFormFlg) {
      return;
    }
    this.matchUser = null;
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      gender: this.user.gender,
      matchPreference: this.user.matchPreference,
      lat: Math.round(this.user.latitude),
      lng: Math.round(this.user.longitude),
      matchAgeYear: this.user.matchAgeYear,
      matchAgeRange: this.user.matchAgeRange,
      action: action
    };
    console.log('params', params);
    this.executeApi('findMatches.php', params, true);
  }
  verifyPictures() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: 'verifyPictures'
    };
    console.log('params', params);
    this.executeApi('appApiCode.php', params, true);
  }
  confirmPic() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      action: 'confirmPic'
    };
    console.log('params', params);
    this.executeApi('appApiCode.php', params, true);
  }
  rejectPic() {
    var reason = $('#picOption').val();
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      reason: reason,
      action: 'rejectPic'
    };
    console.log('params', params);
    if (reason > 0)
      this.executeApi('appApiCode.php', params, true);
  }
  loadThisUser() {
    this.exceededPoolSizeFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.uid,
      action: "getThisUser"
    };
    this.executeApi('appApiCode2.php', params, true);
  }
  //--------------------------------------------
  override postSuccessApi(file: string, responseJson: any) {
    console.log('--postSuccessApi--', responseJson);
    if (responseJson.action == "yesToMatch" || responseJson.action == "noToMatch") {
      localStorage['admirerCount'] = responseJson.admirerCount;
      localStorage['notifications'] = responseJson.notifications;
      localStorage['matchesAlerts'] = responseJson.matchesAlerts;
      this.headerObj.admirerCount = responseJson.admirerCount;
      this.headerObj.matchesAlerts = responseJson.matchesAlerts;
      this.headerObj.notifications = responseJson.notifications;
      if (this.id == 4 && responseJson.action == "yesToMatch") {
        //--Admirers
        this.router.navigate(['user-detail'], { queryParams: { 'uid': this.matchUser.user_id } });
      } else {
        this.currentProfileIndex++;
        this.showCurrentProfile();
      }
    }
    if (responseJson.action == 'findMatches' || responseJson.action == 'getMyAdmirers' || responseJson.action == 'verifyPictures') {
      if (this.responseJson.playerList) {

        this.playerList = [];
        this.responseJson.playerList.forEach((element: any) => {
          this.playerList.push(new User(element));
        });

        this.currentProfileIndex = 0;
        this.showCurrentProfile();
        console.log('xxxthis.playerList', this.playerList);
      }
    }
    if (responseJson.action == 'removeThisUser') {
      this.router.navigate(['']);
    }
    if (responseJson.action == 'logUser') {
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'getThisUser') {
      this.matchUser = new User(responseJson.user);
      this.pageTitle = this.matchUser.firstName;
      this.calculatingStatsFlg = true;

      //this.logUser();
      this.displayThisProfile();

    }
    if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
    }
    if (responseJson.action == 'confirmPic' || responseJson.action == 'rejectPic') {
      this.showFakePicOptionsFlg = false;
      this.currentProfileIndex++;
      this.showCurrentProfile();
    }
  }

  displayThisProfile() {
    this.calculateDistance(this.matchUser, this.user);

    if (this.matchUser.state && this.user.state != this.matchUser.state) {
      this.matchUser.location = this.matchUser.city + ', ' + this.matchUser.state;
    }
    if (this.matchUser.countryName && this.user.countryName != this.matchUser.countryName) {
      this.matchUser.location = this.matchUser.city + ', ' + this.matchUser.countryName;
    }

    if (this.matchSnapshotModal)
      this.populateViewChildren();
    else {
      setTimeout(() => {
        this.populateViewChildren();
      }, 1000);
    }

  }

  populateViewChildren() {
    if (this.messagesModal)
      this.messagesModal.populateModal(this.matchUser);

    if (this.matchSnapshotModal) {
      this.matchSnapshotModal.ngOnInit();
      this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, this.matchObj);
    }
  }

  showCurrentProfile() {
    console.log('++++showCurrentProfile', this.playerList.length, this.currentProfileIndex);
    if (this.playerList.length > this.currentProfileIndex) {

      this.matchUser = this.playerList[this.currentProfileIndex];
      this.displayThisProfile();

    } else {
      this.matchUser = null;
    }
  }

  calculateDistance(matchUser: any, user: any) {
    this.distance = '';
    if (user.latitude && matchUser.latitude && user.user_id != matchUser.user_id) {
      var miles = distanceInKmBetweenEarthCoordinates(user.latitude, user.longitude, matchUser.latitude, matchUser.longitude);
      this.distance = parseInt(miles.toString()) + ' miles';
    }
  }

  matchSnapshotEvent(action: string) {
    if (action == 'nextProfile') {
      this.currentProfileIndex++;
      this.showCurrentProfile();
      return;
    }
    if (action == 'remove')
      action = 'removeThisUser';
    if (action == 'ban')
      action = 'banThisUser';
    console.log('matchSnapshotEvent', action);

    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    console.log('this params!', params);
    this.executeApi('appApiCode2.php', params, true);
  }

}
function degreesToRadians(degrees: number) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}