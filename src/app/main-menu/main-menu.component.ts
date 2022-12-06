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
  public papgeTitle = 'Home';
  public states:any = [];
  public countries:any = [];


  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loadUserObj();
    this.getStateCounts();

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
      this.notifications = this.user.notifications;
      //this.logUser();
    }
  }
  getStateCounts() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getStateCounts"
    };
    this.executeApi('appApiCode.php', params, true);
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
      this.headerObj.messageCount = localStorage['messageCount'];
      this.router.navigate([''], { queryParams: { 'login': '0' } });
    }
    if (value == 'logout')
      this.logoutUser();
  }
  override loginClicked(action: string) {
    console.log('login clicked!');
    if (this.user)
      this.notifications = this.user.notifications;

    if (!action)
      this.popupNum = 2;

  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "getStateCounts") {
      this.states = responseJson.stateName;
      this.countries = responseJson.countries;
      this.logUser();
    }
    if (responseJson.action == "logUser") {
      if (this.user && this.user.ip == '')
        this.populateGeoInfo();
      else
        this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'updateGeoInfo') {
      this.syncUserWithLocalStorage(responseJson);
    }
  }

}
