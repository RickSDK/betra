import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
//import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { ActivatedRoute, Router } from '@angular/router';
//import { Blog } from '../classes/blog';
//import { AdvancedFiltersComponent } from '../advanced-filters/advanced-filters.component';
import { ScrollItem } from '../classes/scroll-item';

declare var getDateObjFromJSDate: any;

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
  public displayItems: any = [];
  public scrollItems: any = [
    { id: 'item1', name: 'item 1', src: 'assets/images/landing/couple2.png', type: 'New Blog Post', description: 'description', icon: 'fa fa-book' },
    { id: 'item2', name: 'item 2', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item3', name: 'item 3', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item4', name: 'item 4', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item5', name: 'item 5', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item6', name: 'item 6', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item7', name: 'item 7', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item8', name: 'item 8', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item9', name: 'item 9', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
    { id: 'item10', name: 'item 10', src: 'assets/images/landing/couple2.png', type: 'type', description: 'description', icon: 'fa fa-book' },
  ];
  public currentIndex = 0;
  public holidayScr: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    if(!this.user || !this.userId) {
      this.router.navigate(['']);
      return;
  
    }

    var dt = getDateObjFromJSDate();
    if (dt.mo == 2 && dt.dayOfMonth == 14)
      this.holidayScr = 'assets/images/holidays/valentines-day.jpg';

    window.scrollTo(0, 0);

    document.addEventListener('scroll', () => {
      this.checkIsVisible();
    })

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
      this.getDataFromServer('getScrollData', 'scroll.php', {});
      if (!localStorage['latitude'])
        this.getLocation();
      else if (!this.user.navLat)
        this.uploadCoordinates();
    }
  }
  addScrollItem() {
    if (this.scrollItems.length <= this.currentIndex)
      return;
    this.displayItems.push(new ScrollItem(this.scrollItems[this.currentIndex], this.currentIndex));
    this.currentIndex++;
  }
  checkIsVisible() {
    if (!this.displayItems)
      return;
    if (this.displayItems.length == this.scrollItems.length) {
      console.log('done.');
      return;
    }
    var lastId = this.displayItems[this.displayItems.length - 1].id;
    const element = document.getElementById(lastId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight) {
        console.log("adding 3 items");
        this.addScrollItem();
        this.addScrollItem();
        this.addScrollItem();
      }

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
    if (responseJson.action == "getScrollData") {
      //this.blog1 = new Blog(responseJson.blogList[0]);
      //this.blog2 = new Blog(responseJson.blogList[1]);
      this.scrollItems = [];
      this.responseJson.userItems.forEach((element: any) => {
        this.scrollItems.push(element);
        if (this.responseJson.blogItems.length > 0)
          this.scrollItems.push(this.responseJson.blogItems.shift());
        if (this.responseJson.matchItems.length > 0)
          this.scrollItems.push(this.responseJson.matchItems.shift());
        if (this.responseJson.roseItems.length > 0)
          this.scrollItems.push(this.responseJson.roseItems.shift());
        if (this.responseJson.dateItems.length > 0)
          this.scrollItems.push(this.responseJson.dateItems.shift());
        if (this.responseJson.reviewItems.length > 0)
          this.scrollItems.push(this.responseJson.reviewItems.shift());
        if (this.responseJson.journalItems.length > 0)
          this.scrollItems.push(this.responseJson.journalItems.shift());

      });
      this.scrollItems.sort((a: any, b: any) => {
        return (a.created < b.created) ? 1 : (a.created > b.created) ? -1 : 0;
      });
      //console.log(this.scrollItems);

      this.addScrollItem();
      this.addScrollItem();
      this.addScrollItem();
      this.logUser();
    }
    if (responseJson.action == "logUser" && this.user) {
      this.userStatus = this.user.status;
      if (this.user && this.user.ip == '')
        this.populateGeoInfo();
      else {
        this.syncUserWithLocalStorage(responseJson);
      }
    }
    if (responseJson.action == 'updateGeoInfo') {
      this.syncUserWithLocalStorage(responseJson);
    }
  }

}
