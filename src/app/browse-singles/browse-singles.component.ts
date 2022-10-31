import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-browse-singles',
  templateUrl: './browse-singles.component.html',
  styleUrls: ['./browse-singles.component.scss']
})
export class BrowseSinglesComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent);

  public matchUser: any = null;
  public playerList: any = [];
  public currentProfileIndex = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.findMatches();
  }
  findMatches() {
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
  seeMyMatches() {
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', this.responseJson);
    if (responseJson.action == 'findMatches' && this.responseJson.playerList) {
      this.playerList = [];
      this.responseJson.playerList.forEach((element: any) => {
        this.playerList.push(new User(element));
      });

      this.currentProfileIndex = 0;
      this.showCurrentProfile();
    }
    if(responseJson.action == 'yesToMatch' || responseJson.action == 'noToMatch') {
      if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
        this.refreshUserObj(responseJson.user);
      }
      this.currentProfileIndex++;
      this.showCurrentProfile();
    }

  }
  showCurrentProfile() {
    if (this.playerList.length > this.currentProfileIndex) {
      this.matchUser = this.playerList[this.currentProfileIndex];
      setTimeout(() => {
        this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, null);
      }, 1500);
    } else {
      this.matchUser = null;
    }

  }


  matchSnapshotEvent(action: string) {
    console.log('xxx matchSnapshotEvent xxx', action, this.matchUser);
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    this.executeApi('appApiCode2.php', params, true);
  }

}
