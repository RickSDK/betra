import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../classes/blog';

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
  public blog1: any = null;
  public blog2: any = null;


  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loadUserObj();
    this.getDataFromServer('getBlogs', 'blog.php', []);
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
      if (!localStorage['latitude'])
        this.getLocation();
      else if (!this.user.navLat)
        this.uploadCoordinates();
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
    if (responseJson.action == "getBlogs" && responseJson.blogList.length>1) {
      this.blog1 = new Blog(responseJson.blogList[0]);
      this.blog2 = new Blog(responseJson.blogList[1]);
//      console.log('hey!', responseJson);
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
