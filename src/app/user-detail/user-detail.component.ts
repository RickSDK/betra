import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent);

  public uid: number = 0;
  public id: number = 0;
  public pageTitle = 'User Detail';
  public matchUser: any = null;
  public calculatingStatsFlg = true;
  public matchObj = { status: 'not started', matchesFound: 0, progressPercent: 0, currentMatch: 0 };
  public playerList: any = [];
  public currentProfileIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
      this.id = params['id'] || 0;
      if (this.uid > 0)
        this.loadThisUser();
      else if (this.id == 4) {
        this.pageTitle = 'Admirers';
        this.browseSingles('getMyAdmirers');
      } else if (this.id == 5) {
        this.pageTitle = 'Online Now';
        this.browseSingles('getOnlineSingles');
      } else {
        this.pageTitle = 'Browse';
        this.browseSingles('findMatches');
      }
    })
  }
  browseSingles(action: string) {
    this.matchUser = null;
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      gender: this.user.gender,
      matchPreference: this.user.matchPreference,
      action: action
    };
    console.log('params', params);
    this.executeApi('appApiCode.php', params, true);
  }
  loadThisUser() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.uid,
      action: "getThisUser"
    };
    this.executeApi('appApiCode2.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "yesToMatch" || responseJson.action == "noToMatch") {
      console.log('hey!!', responseJson);
      localStorage['admirerCount'] = responseJson.admirerCount;
      this.headerObj.admirerCount = responseJson.admirerCount;
      this.currentProfileIndex++;
      this.showCurrentProfile();
    }
    if (responseJson.action == 'findMatches' || responseJson.action == 'getMyAdmirers') {
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
    if (responseJson.action == 'getThisUser') {
      this.matchUser = new User(responseJson.user);
      this.pageTitle = this.matchUser.firstName;
      this.calculatingStatsFlg = true;
      //console.log('this.matchUser', this.matchUser);

      setTimeout(() => {
        this.calculatingStatsFlg = false;
        this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, this.matchObj);
      }, 1500);
    }
    if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
     // console.log('xxx refresh made!');
     // this.refreshUserObj(responseJson.user);
     // this.loadThisUser();
    }
  }
  showCurrentProfile() {
    console.log('showCurrentProfile', this.playerList.length, this.currentProfileIndex);
    if (this.playerList.length > this.currentProfileIndex) {

      this.matchUser = this.playerList[this.currentProfileIndex];
      setTimeout(() => {
        if (this.matchUser)
          this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, null);
      }, 1500);
    } else {
      this.matchUser = null;
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
