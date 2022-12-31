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
  public states: any = [];
  public countries: any = [];
  public login: number = 0;


  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    window.scrollTo(0, 0);


    var searchQueryArr = ['dog2'];

    localStorage.setItem("searchHistory", JSON.stringify(searchQueryArr));
    //var item = localStorage.getItem("searchHistory");
    //var searchHistory = (item) ? JSON.parse(item) : [];
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory") || '[]');

    console.log(searchQueryArr, searchHistory);


    this.loadUserObj();
    this.getStateCounts();
    this.popupNum = 1;

    this.route.queryParams.subscribe(params => {
      if (!localStorage['user_id']) {
        this.userId = 0;
        this.user = null;
        this.headerObj.profileCompleteFlg = false;
      }
      this.login = params['login'] || 0;
      if (this.login == 2)
        this.logoutUser();
    })
    if (this.user && this.user.status == 'Active') {
      this.popupNum = 0;
      this.headerObj.notifications = this.user.notifications;
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
      this.headerObj.notifications = localStorage['notifications'];
      this.headerObj.admirerCount = localStorage['admirerCount'];
      this.headerObj.messageCount = localStorage['messageCount'];
      console.log('navigating to main menu');
      this.router.navigate([''], { queryParams: { 'login': '4' } });
    }
    if (value == 'logout')
      this.logoutUser();
  }
  override loginClicked(action: string) {
    console.log('login clicked!');
    if (this.user)
      this.headerObj.notifications = this.user.notifications;

    if (!action)
      this.popupNum = 2;

  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "getStateCounts") {
      this.states = responseJson.stateName;
      this.countries = responseJson.countries;
      var refreshFlg = (this.user && this.user.status == 'Pending') ? 'Y' : '';
      this.logUser(refreshFlg);
    }
    if (responseJson.action == "logUser" && this.user) {
      if (this.user && this.user.ip == '')
        this.populateGeoInfo();
      else {
        this.syncUserWithLocalStorage(responseJson);
        if (this.userStatus != 'Active')
          this.userStatus = this.user.status;
      }
    }
    if (responseJson.action == 'updateGeoInfo') {
      this.syncUserWithLocalStorage(responseJson);
    }
  }

}
