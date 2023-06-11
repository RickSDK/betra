import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
//import { User } from '../classes/user';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { ActivatedRoute, Router } from '@angular/router';
//import { AdvancedFiltersComponent } from '../advanced-filters/advanced-filters.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';

declare var getDateObjFromJSDate: any;
declare var getPlatform: any;
declare var $: any;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent)
  private matchSnapshotModal = {} as MatchSnapshotComponent;

  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

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
  public chatPeople: number = 0;
  public coinX: string = '';
  public coinVisible: boolean = true;
  //  public popupNotice: boolean = false;
  public getPlatform: string = getPlatform();
  public buttons = [
    { name: 'Meet Singles', routerLink: "/user-detail", src: 'assets/images/buttons/v2/meetsingles.jpeg' },
    { name: 'Dating Pool', routerLink: "/matches", src: 'assets/images/buttons/v2/datePool.jpg' },
    { name: 'Game Room', routerLink: "/game-room", src: 'assets/images/buttons/v2/gameroom.jpeg' },
    { name: 'Polls', routerLink: "/poll", src: 'assets/images/buttons/v2/polls.jpeg' },
    { name: 'Contest', routerLink: "/contest", src: 'assets/images/buttons/v2/contest.png' },
    { name: 'View Activity', routerLink: "/activity", src: 'assets/images/buttons/v2/activity.jpeg' },
    { name: 'Photo Club', routerLink: "/photography", src: 'assets/images/buttons/v2/photography.jpeg' },
    { name: 'Photo Class', routerLink: "/photo-school", src: 'assets/images/buttons/v2/photoClass.jpeg' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.user || !this.userId) {
      this.router.navigate(['']);
      return;
    }

    if (this.liteModeFlg) {
      this.buttons = [
        { name: 'Game Room', routerLink: "/game-room", src: 'assets/images/buttons/v2/gameroom.jpeg' },
        { name: 'Chat Room', routerLink: "/chat-room", src: 'assets/images/buttons/v2/activity.jpeg' },
        { name: 'Polls', routerLink: "/poll", src: 'assets/images/buttons/v2/polls.jpeg' },
        { name: 'Photo Club', routerLink: "/photography", src: 'assets/images/buttons/v2/photography.jpeg' },
      ];
    }

    var race = this.user.race;
    if (this.user.race == 'Middle Eastern' || this.user.race == 'Other')
      race = 'Arab';
    if (this.user.race == 'Pacific Islander' || this.user.race == 'South-Asian' || this.user.race == 'Asian-Indian')
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

    // this.logUser();
    // this.loadUserObj();
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
    }
  }

  positionCoin() {
    this.coinX = '200px';
    var e = document.getElementById('coinImg');
    if (e) {
      var box = e.getBoundingClientRect();
      if (box)
        this.coinX = box.x.toString() + 'px';
    }
  }

  annimateCoin() {
    this.coinVisible = false;
    var audio = new Audio('assets/sounds/coins.mp3');
    audio.loop = false;
    audio.play();
    setTimeout(() => {
      this.coinX = ''
    }, 1000);
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
    super.postSuccessApi(file, responseJson);

    if (responseJson.action == "logUser" && this.user && this.user.status == 'Active') {
      if (responseJson.infoObj && !this.liteModeFlg) {
        if (!responseJson.infoObj.roseCeremonyDt || responseJson.infoObj.daysTillRoseCeremony <= 0) {
          var message = 'It has been 7 days since your last rose ceremony, so time for a new ceremony. You will hand out roses to your favorite people, and eliminate a few that you are not interested in.';
          if(this.user.datingPool.length==0)
            message = 'You need to complete a Rose Ceremony in order to populate your dating pool.';
          this.betraPopupComponent.showPopup('Rose Ceremony Time!', message, 99);
        } else if (responseJson.infoObj.daysTillRoseCeremony <= 4 && this.user.heartId == 0 && this.betraPopupComponent) {
          this.betraPopupComponent.showPopup('Time to assign a rose!', 'At this point in the process, you are expected to hand out a rose to your favorite person. Everyone in your dating pool gets to see who you picked.', 2);
        }
      }
      if (responseJson.coinsNewFlg) {
        this.coinX = '200px';
        setTimeout(() => {
          this.positionCoin();
        }, 500);
      }
      // if (this.user.ip == '')
      //   this.populateGeoInfo();
    }
    if (responseJson.action == 'updateGeoInfo') {
      this.syncUserWithLocalStorage(responseJson);
    }
  }

}
