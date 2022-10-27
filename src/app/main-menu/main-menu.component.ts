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
 
  constructor() { super(); }

  override ngOnInit(): void {
    this.loadUserObj();
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

    //this.loadPlayers();
  }
  matchSnapshotEvent(action: string) {
    console.log('xxx matchSnapshotEvent', action);
    if (action == 'cancel') {
      this.cancelMatches();
    } else {
      this.displayNextMatch();
    }
  }
  cancelMatches() {
    //this.displayProfileFlg = true;
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
    if (!action)
      this.popupNum = 2;
    if (action == 'logout') {
      this.user = null;
      this.matchUser = null;
      this.loadUserObj();

    }
  }
  loadPlayers() {
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      action: 'getPlayers'
    };
    this.executeApi('appApiCode.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', this.responseJson);
    if (responseJson.action == "getPlayers") {
      this.playerlist = [];
      responseJson.playerList.forEach((element: any) => {
        var player = new User(element);
        this.playerlist.push(player);
      });
    }
    if (responseJson.action == "findMatches") {
      this.firstMatchFound();
    }
  }
  ngClassToggle() {
    if (this.toggle)
      return 'text-lite';
    else
      return 'text-dark';
  }
  dismisLogin(value: string) {
    console.log('dismisLogin');
    if (value === 'login') {
      this.loadUserObj();
    } else {
      this.popupNum = 1;
    }
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
    if (this.responseJson.playerList.length >= this.matchObj.currentMatch) {
      this.matchObj.status = 'viewing';
      this.displayProfileFlg = false;
      this.matchUser = new User(this.responseJson.playerList[this.matchObj.currentMatch - 1]);
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
      action: 'findMatches'
    };
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
