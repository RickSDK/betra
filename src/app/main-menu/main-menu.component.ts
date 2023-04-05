import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
//import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../classes/blog';
//import { AdvancedFiltersComponent } from '../advanced-filters/advanced-filters.component';
import { ScrollItem } from '../classes/scroll-item';

declare var getDateObjFromJSDate: any;
declare var getPlatform: any;

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
  public showLoadMoreButton: boolean = true;
  public papgeTitle = 'Home';
  public states: any = [];
  public countries: any = [];
  public login: number = 0;
  public blog1: any = null;
  public blog2: any = null;
  public blog3: any = null;
  public blog4: any = null;
  public displayItems: any = [];
  public scrollItems: any = [];
  public currentIndex = 0;
  public holidayScr: string = '';
  public browseScr: string = '';
  public banItemList: any = [];
  public getPlatform: string = getPlatform();
  public buttons = [
    {name: 'Dating Pool', routerLink: "/matches", src: 'assets/images/buttons/datePool.jpg'},
    {name: 'Chat Room', routerLink: "/chat-room", src: 'assets/images/buttons/chat.jpg'},
    {name: 'Advice', routerLink: "/advice", src: 'assets/images/buttons/advice.jpg'},
    {name: 'Contest', routerLink: "/contest", src: 'assets/images/buttons/rose2.jpg'},
    {name: 'View Activity', routerLink: "/activity", src: 'assets/images/buttons/activity.jpeg'},
  ]

  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.user || !this.userId) {
      this.router.navigate(['']);
      return;

    }
    var race = this.user.race;
    if (this.user.race == 'Middle Eastern' || this.user.race == 'Other')
      race = 'Arab';
    if (this.user.race == 'Pacific Islander' || this.user.race == 'South-Asian')
      race = 'Asian';
    if (this.user.race == 'Native American')
      race = 'White';

    //this.user.matchPreference = 'A';
    this.browseScr = 'assets/images/buttons/browse' + this.user.matchPreference + race + '.png';

    var dt = getDateObjFromJSDate();
    if (dt.mo == 2 && dt.dayOfMonth == 14)
      this.holidayScr = 'assets/images/holidays/valentines-day.jpg';
    if (dt.mo == 3 && dt.dayOfMonth == 17)
      this.holidayScr = 'assets/images/holidays/st-patricks-day.jpg';
    if (dt.mo == 4 && dt.dayOfMonth == 9)
      this.holidayScr = 'assets/images/holidays/happy-easter.jpg';
    if (dt.mo == 5 && dt.dayOfMonth == 29)
      this.holidayScr = 'assets/images/holidays/memorial-day.jpg';
    if (dt.mo == 7 && dt.dayOfMonth == 4)
      this.holidayScr = 'assets/images/holidays/july4.jpeg';

     this.logUser();
    this.loadUserObj();
    this.userStatus = this.user.status;
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
    this.responseJson = responseJson;

    if (responseJson.action == "logUser" && this.user) {
      console.log('main menu!', this.userStatus, responseJson);
      this.userStatus = this.user.status;
      if (this.user.ip == '')
        this.populateGeoInfo();

      if (this.user.refreshFlg == 'Y' || (this.user.infoObj && this.user.infoObj.refreshFlg == 'Y'))
        this.syncUserWithLocalStorage(responseJson);

    }
    if (responseJson.action == 'updateGeoInfo') {
      this.syncUserWithLocalStorage(responseJson);
    }
  }

}
