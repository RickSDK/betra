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

      /*
    if (this.getPlatform != 'IOS') {
      document.addEventListener('scroll', () => {
        this.checkIsVisible();
      })
    }
    window.scrollTo(0, 0);*/


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

//      if (this.getPlatform == 'IOS')
//        this.getDataFromServer('getBlogs', 'blog.php', {});
//      else
//        this.getDataFromServer('getScrollData', 'scroll.php', {});

      if (!localStorage['latitude'])
        this.getLocation();
      else if (!this.user.navLat)
        this.uploadCoordinates();
    }
  }
  /*getBanItemList() {
    if (localStorage['banItemList'])
      return JSON.parse(localStorage['banItemList']);
    else
      return [];
  }
  setBanItemList(banItemList: any) {
    localStorage['banItemList'] = JSON.stringify(banItemList);
  }
  getBanItemListHash() {
    var banItemList = this.getBanItemList();
    var banItemListHash: any = {};
    banItemList.forEach((element: any) => {
      banItemListHash[element] = true;
    });
    console.log('banItemListHash', banItemListHash);
    return banItemListHash;
  }
  clearItem(item: any) {
    this.banItemList = this.getBanItemList();
    this.banItemList.push(item.name);
    this.setBanItemList(this.banItemList);
    var displayItems: any = [];
    this.displayItems.forEach((element: any) => {
      if (element.name != item.name)
        displayItems.push(element);
    });
    this.displayItems = displayItems;
    this.addScrollItem();
  }
  addScrollItem() {
    if (this.scrollItems.length <= this.currentIndex)
      return false;
    var banItemListHash = this.getBanItemListHash();

    var scrollItem = new ScrollItem(this.scrollItems[this.currentIndex], this.currentIndex);
    this.currentIndex++;
    if (banItemListHash[scrollItem.name]) {
      this.addScrollItem();
      console.log('banned item!', scrollItem.name);
      return false;
    } else {
      this.displayItems.push(scrollItem);
      return true;
    }
  }
  loadMoreScrollCards() {
    for (var i = 0; i < 12; i++)
      this.showLoadMoreButton = this.addScrollItem();
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

  }*/

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

    if (responseJson.action == "getBlogs" && responseJson.blogList && responseJson.blogList.length > 4) {
      this.blog1 = new Blog(responseJson.blogList[4]);
      this.blog2 = new Blog(responseJson.blogList[5]);
      this.blog3 = new Blog(responseJson.blogList[6]);
      this.blog4 = new Blog(responseJson.blogList[7]);
    }
    /*if (responseJson.action == "getScrollData") {
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

      for (var i = 0; i < 12; i++)
        this.addScrollItem();
      this.logUser();
    }*/
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
