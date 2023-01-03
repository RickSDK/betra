import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProfileTopComponent } from '../profile-top/profile-top.component';

@Component({
  selector: 'app-match-snapshot',
  templateUrl: './match-snapshot.component.html',
  styleUrls: ['./match-snapshot.component.scss']
})
export class MatchSnapshotComponent implements OnInit {
  @ViewChild(ProfileTopComponent) profileTopComponent: ProfileTopComponent = new (ProfileTopComponent);

  @Input('matchUser') matchUser: any = null;
  @Input('user') user: any = null;
  @Input('loadingFlg') loadingFlg: boolean = false;
  @Input('errorMessage') errorMessage: string = '';
  @Input('snapshotFlg') snapshotFlg: boolean = false;
  @Input('id') id: number = 0;
  @Input('singleProfileFlg') singleProfileFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public personalityMatch = 0;
  public polyMatch = 0;
  public profileMatch = 0;
  public totalMatch = 0;
//  public matchObj: any;
  public showMoreOptionsFlg: boolean = false;
  public showConfirmationFlg: boolean = false;
  public action: string = '';
  public showInterestedButtonsFlg: boolean = false;
  public youAreInterestedFlg: boolean = false;
  public showMoreFlg: boolean = false;
  public expandBottomFlg: boolean = false;
  public showBottumButtonsFlg: boolean = false;
  public distance: string = '';


  constructor() { }

  ngOnInit(): void {
    if (this.user && this.matchUser)
      this.initModal(this.matchUser, this.user, null);

  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  initModal(matchUser: any, user: any, matchObj: any) {
    this.user = user;
    //this.matchObj = matchObj;
    this.matchUser = matchUser;

    var limit = (this.user.memberFlg)?12:8;
    this.showMoreOptionsFlg = (this.user.datingPool.length > limit);
    this.showMoreFlg = (this.user.datingPool.length > limit);
    this.expandBottomFlg = (this.user.datingPool.length > limit);

    if (this.profileTopComponent) {
      this.profileTopComponent.ngOnInit();
    }

    this.calculateMatches(user, matchUser, matchObj);
    this.calculateDistance(matchUser, user);

  }

  buttonPressed(action: string) {
    this.action = action;
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = true;
  }

  calculateMatches(user: any, matchUser: any, matchObj: any = null) {
    console.log('+++calculateMatches+++');

    //this.matchObj = matchObj;
    if (!this.matchUser.matchObj)
      return;

    this.showInterestedButtonsFlg = matchUser.user_id != user.user_id;
    if (user.matchPreference == 'F' && matchUser.gender == 'M')
      this.showInterestedButtonsFlg = false;
    if (user.matchPreference == 'M' && matchUser.gender == 'F')
      this.showInterestedButtonsFlg = false;

    if (matchUser.matchPreference == 'F' && user.gender == 'M')
      this.showInterestedButtonsFlg = false;
    if (matchUser.matchPreference == 'M' && user.gender == 'F')
      this.showInterestedButtonsFlg = false;


    if (this.matchUser.matchObj.match_interested == 'Y')
      this.showInterestedButtonsFlg = true; // handle out of sync

    if (this.id == 7)
      this.showInterestedButtonsFlg = false; // verify pics


    this.youAreInterestedFlg = !!(this.matchUser.matchObj && this.matchUser.matchObj.you_interested);

    //---------------------
    this.matchUser.matchObj.showButtonsFlg = this.showInterestedButtonsFlg && !this.youAreInterestedFlg;
    this.matchUser.matchObj.matchMadeFlg = (this.matchUser.matchObj && this.matchUser.matchObj.match_level == 2);
    //---------------------

    var agePoints = Math.abs(user.matchAge - matchUser.age) <= 4 ? 1 : 0;
    var religionPoints = (user.matchReligion == matchUser.religion) ? 1 : 0;
    var educationPoints = (user.matchEducation == matchUser.educationLevel) ? 1 : 0;
    var kidsPoints = (user.wantsKids == matchUser.wantsKids) ? 1 : 0;
    var hasKids = 1;
    if (user.wantsKids == 'No' && matchUser.numKids > 0)
      hasKids = 0;
    if (user.wantsKids == 'Yes' && matchUser.numKids == 0)
      hasKids = 0;
    var marriagePoints = (user.matchMarriage == matchUser.marriageView) ? 1 : 0;
    var relationshipPoints = (user.matchRelationship == matchUser.desiredRelationship) ? 1 : 0;
    var heightPoints = (user.matchHeight == matchUser.bodyHeight) ? 1 : 0;
    var bodyPoints = (user.matchBody == matchUser.bodyType) ? 1 : 0;
    var totalPoints = (agePoints + religionPoints + educationPoints + kidsPoints + hasKids + marriagePoints + relationshipPoints + heightPoints + bodyPoints);

    this.profileMatch = Math.round(100 * totalPoints / 9);
    //-----------------------
    var personalityDiff = Math.abs(user.personalityNum - matchUser.personalityNum);
    this.personalityMatch = Math.round(100 - 100 * (personalityDiff / 14));

    //-----------------------
    var conLibertarian = Math.abs(user.conLibertarian - matchUser.conLibertarian);
    var conStatist = Math.abs(user.conStatist - matchUser.conStatist);
    this.polyMatch = Math.round(100 - 100 * ((conLibertarian + conStatist) / 16));

    if (this.profileMatch < 1)
      this.profileMatch = 1;

    if (this.polyMatch < 1)
      this.polyMatch = 1;

    if (this.personalityMatch < 1)
      this.personalityMatch = 1;

    this.totalMatch = Math.round((this.profileMatch + this.polyMatch + this.personalityMatch) / 3);

    this.user.kidsNum = (this.user.matchHasKids == 'No') ? '0' : '99';

    if (this.user.matchHasKids == 'Yes' && this.matchUser.numKids > 0)
      this.user.kidsNum = this.matchUser.numKids;


  }
  expandBottom() {
    this.expandBottomFlg = true;
    this.profileMatch = 0;
    this.polyMatch = 0;
    this.personalityMatch = 0;
    this.totalMatch = 0;
    setTimeout(() => {
      this.showMoreFlg = true;
    }, 400);
    setTimeout(() => {
      this.calculateMatches(this.user, this.matchUser);
    }, 1500);
  }
  collpaseBottom() {
    this.expandBottomFlg = false;
    setTimeout(() => {
      this.showMoreFlg = false;
    }, 400);
  }
  actionButtonClicked(action: string) {
    if (action == "show-more") {
      if (this.showMoreFlg)
        this.collpaseBottom();
      else
        this.expandBottom();
      return;
    }
    if (action == 'yesToMatch' && this.matchUser.matchObj.match_interested == 'Y') {
      this.matchUser.matchObj.matchMadeFlg = true;
      this.showInterestedButtonsFlg = false;
      setTimeout(() => {
        this.messageEvent.emit(action);
      }, 1500);
      return;
    }
    this.profileMatch = 0;
    this.polyMatch = 0;
    this.personalityMatch = 0;
    this.totalMatch = 0;
    //this.matchObj = null;
    this.messageEvent.emit(action);
  }

  clickYesOption() {
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = false;
    this.messageEvent.emit(this.action);
  }

  calculateDistance(matchUser: any, user: any) {
    this.distance = '';
    if (user.latitude && matchUser.latitude && user.user_id != matchUser.user_id) {
      var miles = distanceInKmBetweenEarthCoordinates(user.latitude, user.longitude, matchUser.latitude, matchUser.longitude);
      this.distance = parseInt(miles.toString()) + ' miles';
    }
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