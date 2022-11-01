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
      this.logUser();
    }
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
      this.headerObj.profileCompleteFlg = false;
      this.papgeTitle = '';
      this.notifications = 0;
      this.loadUserObj();
    }
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', this.responseJson);
 
    if (responseJson.action == "logUser") {
      this.notifications = responseJson.notifications;
      this.headerObj.admirerCount = responseJson.admirerCount;
      localStorage['notifications'] = responseJson.notifications;
      localStorage['admirerCount'] = responseJson.admirerCount;
      if (responseJson.refreshFlg == 'Y')
        this.refreshUserObj(responseJson.user);
    }
  }
  
}
