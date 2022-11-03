import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    this.loadUserObj();

    this.route.queryParams.subscribe(params => {
      if (!localStorage['user_id']) {
        this.userId = 0;
        this.user = null;
        this.popupNum = 1;
        this.headerObj.profileCompleteFlg = false;
      }
      var login = params['login'] || 0;
      if (login == 1)
        this.popupNum = 2; // show login
      if (login == 2)
        this.logoutUser();
      if (login == 3)
        this.popupNum = 1; // cancel login
    })

    if (this.user && this.user.status == 'Active') {
      this.papgeTitle = 'My Profile';
      this.notifications = this.user.notifications;
      this.logUser();
    }
  }

  logoutUser() {
    console.log('logout!');
    this.userId = 0;
    this.user = null;
    this.headerObj.profileCompleteFlg = false;
    this.popupNum = 1;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.router.navigate(['']);
  }
  userIsLoggedIn(value: string) {
    console.log('userIsLoggedIn', value);
    if (value === 'login') {
      this.loadUserObj();
      this.notifications = localStorage['notifications'];
      this.headerObj.admirerCount = localStorage['admirerCount'];
      this.router.navigate([''], { queryParams: { 'login': '0' } });
    }
  }
  override loginClicked(action: string) {
    console.log('login clicked!');
    if (this.user)
      this.notifications = this.user.notifications;

    if (!action)
      this.popupNum = 2;

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
  override postSuccessApi(file: string, responseJson: any) {
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
