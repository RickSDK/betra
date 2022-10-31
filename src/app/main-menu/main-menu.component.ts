import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent);

  public playerlist: any = [];
  public toggle: boolean = false;
  public matchObj = { status: 'not started', matchesFound: 0, progressPercent: 0, currentMatch: 0 };
  public matchUser: any = null;
  public displayProfileFlg = true;
  public papgeTitle = '';

  constructor() { super(); }

  override ngOnInit(): void {
    this.loadUserObj();

    if (this.user && this.user.status == 'Active') {
      this.papgeTitle = 'My Profile';
      this.notifications = this.user.notifications;
    }
    this.logUser();
    if (0) {
      //test match snapshot
      this.matchUser = this.user;
      this.matchObj.matchesFound = 3;
      this.matchObj.currentMatch = 1;
      this.displayProfileFlg = false;
      this.matchObj.status = 'viewing'

      setTimeout(() => {
        this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, this.matchObj);
      }, 500);
    }

  }
  matchSnapshotEvent(action: string) {
    console.log('xxx matchSnapshotEvent xxx', action, this.matchUser);
    this.errorMessage = '';
    if (action == 'cancel') {
      this.cancelMatches();
    }
    if (action == 'yesToMatch') {
      this.loadingFlg = true;
      if (!this.matchUser || this.matchUser.user_id == this.user.user_id) {
        console.log('error');
        this.errorMessage = 'Error - invalid user';
        this.loadingFlg = false;
        return;
      }
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        matchId: this.matchUser.user_id,
        action: action
      };
      this.executeApi('appApiCode2.php', params, true);
      this.displayNextMatch();
    }
    if (action == 'noToMatch') {
      this.loadingFlg = true;
      if (!this.matchUser || this.matchUser.user_id == this.user.user_id) {
        console.log('error');
        this.errorMessage = 'Error - invalid user';
        this.loadingFlg = false;
        return;
      }
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        matchId: this.matchUser.user_id,
        action: action
      };
      this.executeApi('appApiCode2.php', params, true);
      this.displayNextMatch();
    }
  }
  cancelMatches() {
    this.playerlist = [];
    this.matchUser = null;
    this.matchObj.status = 'not started';
  }
  logUser() {
    var uid = localStorage['user_id'];
    var email = localStorage['email'];
    var code = localStorage['code'];

    if (uid > 0 && email && code) {
      var params = {
        userId: localStorage['user_id'],
        email: localStorage['email'],
        code: localStorage['code'],
        action: 'logUser'
      };
      this.executeApi('appApiCode.php', params, true);
    }

  }
  override loginClicked(action: string) {
    console.log('login clicked!');
    if(this.user)
      this.notifications = this.user.notifications;

    if (!action)
      this.popupNum = 2;
    if (action == 'logout') {
      this.user = null;
      this.matchUser = null;
      this.profileCompleteFlg = false;
      this.papgeTitle = '';
      this.notifications = 0;
      this.loadUserObj();
    }
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', this.responseJson);
    if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
      this.refreshUserObj(responseJson.user);
    }
    if (responseJson.action == "getPlayers" || responseJson.action == "findMatches") {
      this.playerlist = [];
      responseJson.playerList.forEach((element: any) => {
        var player = new User(element);
        this.playerlist.push(player);
      });

    }
    if (responseJson.action == "findMatches") {
      this.matchObj.status = 'completed';
      this.matchObj.currentMatch = 0;
      this.matchObj.matchesFound = this.playerlist.length;
      if (this.playerlist.length > 0)
        this.displayNextMatch();
    }
    if (responseJson.action == "logUser") {
      this.notifications = responseJson.notifications;
      localStorage['notifications'] = responseJson.notifications;
      if (responseJson.refreshFlg == 'Y')
        this.refreshUserObj(responseJson.user);
    }
  }
  ngClassToggle() {
    if (this.toggle)
      return 'text-lite';
    else
      return 'text-dark';
  }

  snapshotButtonClicked(action: string) {
    if (action == 'search') {
      this.findMatches();
    }
    if (action == 'seeMatches') {
      this.matchObj.currentMatch = 0;
      this.displayNextMatch();

    }

  }
  displayNextMatch() {
    this.matchObj.currentMatch++;
    console.log('xxxdisplayNextMatch', this.matchObj.currentMatch, this.playerlist);
    if (this.playerlist && this.playerlist.length >= this.matchObj.currentMatch) {
      this.matchObj.status = 'viewing';
      this.displayProfileFlg = false;
      this.matchUser = this.playerlist[this.matchObj.currentMatch - 1];
      setTimeout(() => {
        this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, this.matchObj);
      }, 500);
    } else {
      this.cancelMatches();
    }
  }
  findMatches() {
    this.matchObj.status = 'started';
    this.matchObj.matchesFound = 0;
    this.matchObj.progressPercent = 0;

    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      gender: this.user.gender,
      matchPreference: this.user.matchPreference,
      action: 'findMatches'
    };
    console.log('params', params);
    this.executeApi('appApiCode.php', params, true);


  }
  firstMatchFound() {
    this.matchObj.progressPercent = 50;
    if (this.responseJson && this.responseJson.playerList && this.responseJson.playerList.length > 0)
      this.matchObj.matchesFound = 1;

    this.matchObj.progressPercent = 100;
    if (this.responseJson && this.responseJson.playerList)
      this.matchObj.matchesFound = this.responseJson.playerList.length;

    this.matchObj.status = 'completed';
    this.matchObj.currentMatch = 0;
    this.displayNextMatch();

  }

}
