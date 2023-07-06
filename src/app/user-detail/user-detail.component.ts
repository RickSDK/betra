import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { Router } from '@angular/router';
import { UserCommunicationComponent } from '../user-communication/user-communication.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { UserWallComponent } from '../user-wall/user-wall.component';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  @ViewChild(MatchSnapshotComponent)
  private matchSnapshotModal = {} as MatchSnapshotComponent;
  @ViewChild(UserCommunicationComponent)
  private messagesModal = {} as UserCommunicationComponent;
  @ViewChild(UserWallComponent)
  private userWallComponent = {} as UserWallComponent;

  //@ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = null;
  //  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent(this.databaseService));
  //@ViewChild(UserCommunicationComponent) messagesModal: UserCommunicationComponent = new (UserCommunicationComponent(this.databaseService));

  public uid: number = 0;
  public id: number = 0;
  public pageTitle = 'User Detail';
  public matchUser: any = null;
  public dateObj: any = null;
  public calculatingStatsFlg = true;
  public matchObj = { status: 'not started', matchesFound: 0, progressPercent: 0, currentMatch: 0 };
  public playerList: any = [];
  public currentProfileIndex = 0;
  //public exceededPoolSizeFlg: boolean = false;
  public showMatchLevelInfoFlg: boolean = false;
  public showFakePicOptionsFlg: boolean = false;
  public showFilter: boolean = false;
  public advancedSearchFlg: boolean = false;
  public searchStarted: boolean = false;
  public matchesCount: number = 0;
  public showExpandedSearchPopupFlg: boolean = false;
  public action: string = '';
  public showNewReviewPopup: boolean = false;
  public showBackButton: boolean = false;
  public profileViews: number = 0;
  public showProfileViewDetailsFlg: boolean = false;
  public showEmptyDatingPoolFlg: boolean = false;
  public commentsOnlyFlg: boolean = false;
  public messageCount: number = 0;
  public showBigPopupFlg: boolean = false;
  public showYesNoButtonsFlg: boolean = false;
  public noLocationInfoFoundFlg: boolean = false;
  public newGifts: boolean = false;
  public daysTillRoseCeremony: number = 0;
  public messagesLoadingFlg: boolean = false;
  public distanceRange: number = 0;
  //  public showOverflowPopup: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.matchUser = null;
    if (!this.user) {
      this.router.navigate(['']);
      return;
    }
    this.showEmptyDatingPoolFlg = this.user.datingPool.length == 0;
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
      this.id = params['id'] || 0;

      this.commentsOnlyFlg = params['c'] && params['c'] == 'Y';
      this.showBackButton = params['s'] && params['s'] == 'Y';
      this.advancedSearchFlg = (params['filter'] == 'true');
      this.showFilter = this.advancedSearchFlg;
      this.searchStarted = !this.showFilter;

      if (this.uid > 0)
        this.loadThisUser();
      else if (this.id == 4) {
        this.pageTitle = 'Admirers';
        this.browseSingles('getMyAdmirers2');
      } else if (this.id == 5) {
        this.pageTitle = 'Online Today';
        this.browseSingles('getOnlineSingles');
      } else if (this.id == 7) {
        this.pageTitle = 'Approve Profile Pic';
        //this.verifyPictures();
      } else {
        this.id = 2;
        this.pageTitle = 'Browse';
        this.showBigPopupFlg = true;
        this.showYesNoButtonsFlg = true;
        if (!this.showFilter)
          this.browseSingles('findMatches');
      }
    })
  }

  showAdvancedFilters() {
    this.showFilter = true;
    this.searchStarted = false;
  }

  advancedSearch(event: any) {
    if (this.user.exceededPoolSizeFlg || this.user.showHeartFormFlg) {
      return;
    }
    if (!this.user.lat)
      return;
    this.searchStarted = true;
    this.matchUser = null;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchPreference: this.user.matchPreference,
      lat: Math.round(this.user.latitude),
      lng: Math.round(this.user.longitude),
      matchAgeYear: this.user.matchAgeYear,
      matchAgeRange: $('#ageRange').val(),
      distance: $('#distance').val(),
      location: $('#location').val(),
      country: $('#country').val(),
      state: $('#state').val(),
      city: $('#city').val(),
      activityLevel: $('#activityLevel').val(),
      relationshipType: $('#relationshipType').val(),
      marriageView: $('#marriageView').val(),
      bodyType: $('#bodyType').val(),
      race: $('#race').val(),
      religion: $('#religion').val(),
      tattoos: $('#tattoos').val(),
      testFlg: '',
      action: 'findMatchesAdvanced'
    };
    console.log('params', params);
    this.executeApi('findMatches.php', params, true);

  }


  browseSingles(action: string) {
    this.searchStarted = false;
    this.matchUser = null;

    this.getDataFromServer(action, 'findMatches.php', {});
  }

  loadThisUser() {
    //    this.exceededPoolSizeFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.uid,
      action: "getThisUser"
    };
    this.executeApi('appApiCode2.php', params, true);
  }

  messagesEvent(event: string) {
    if (event == 'refresh') {
      console.log('refreshing due to new message read!!!');
      this.logUser();
    }
  }

  buySwipe() {
    this.getDataFromServer('buySwipe', 'findMatches.php', {});
  }
  //--------------------------------------------
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    this.action = responseJson.action;
    if (responseJson.profileViews && responseJson.profileViews > 0)
      this.profileViews = responseJson.profileViews;

    if (responseJson.action == "yesToMatch" || responseJson.action == "noToMatch") {
      this.profileViews = responseJson.profileViews;

      if (this.id == 4 && responseJson.action == "yesToMatch") {
        //--Admirers
        this.router.navigate(['user-detail'], { queryParams: { 'uid': this.matchUser.user_id } });
      } else if (this.uid > 0) {
        console.log('stay here!!');
        this.loadThisUser();
      } else {
        this.showYesNoButtonsFlg = true;
        this.currentProfileIndex++;
        this.showCurrentProfile();
      }
    }

    if (responseJson.action == 'findMatches' || responseJson.action == 'getMyAdmirers' || responseJson.action == 'getMyAdmirers2') {
      this.profileViews = responseJson.profileViews;
      this.distanceRange = responseJson.distanceRange;
      if (responseJson.action == 'getMyAdmirers' || responseJson.action == 'getMyAdmirers2') {
        this.profileViews = 99;
      }
      this.daysTillRoseCeremony = responseJson.daysTillRoseCeremony || 0;
      this.noLocationInfoFoundFlg = responseJson.noLocationInfoFoundFlg;
      if (this.profileViews < 0)
        this.profileViews = 0;

      this.showExpandedSearchPopupFlg = (responseJson.action == 'findMatches' && responseJson.count3 > 0);
      this.playerList = [];
      if (this.responseJson.playerList) {
        this.responseJson.playerList.forEach((element: any) => {
          this.playerList.push(new User(element, this.user));
        });

        this.playerList.sort((a: any, b: any) => {
          return b.matchQualityIndex - a.matchQualityIndex;
        });

        if (this.daysTillRoseCeremony == 0 && this.id == 2) {
          // must do ceremony first!
          this.playerList = [];
        }
        if (responseJson.count1 == 0 && this.id == 2)
          this.playerList = [];
        //console.log('xxxthis.playerList (sorted)', this.playerList);

        this.playerList.forEach((element: any) => {
          console.log(element.firstName, element.age, element.distanceText, element.lastLoginText, element.matchQualityIndex, element.isGoodAge, element.isGoodLocation, element.isGoodActivity);
        });


        this.currentProfileIndex = 0;
        if (this.playerList.length > 0)
          this.showCurrentProfile();
      }
    }
    if (responseJson.action == 'findMatchesAdvanced') {
      this.profileViews = responseJson.profileViews;
      this.showFilter = false;
      this.matchesCount = 0;

      this.playerList = [];

      if (this.responseJson.playerList) {
        this.matchesCount = this.responseJson.playerList.length;
        this.responseJson.playerList.forEach((element: any) => {
          var inRange = true;
          if (responseJson.distance != 'Any') {
            if (responseJson.distance == '10 miles')
              inRange = element.distance <= 10;
            if (responseJson.distance == '50 miles')
              inRange = element.distance <= 50;
            if (responseJson.distance == '100 miles')
              inRange = element.distance <= 100;

          }

          if (inRange)
            this.playerList.push(new User(element));
        });

        this.currentProfileIndex = 0;
        if (this.playerList.length > 0)
          this.showCurrentProfile();
      }
    }
    if (responseJson.action == 'removeThisUser') {
      this.router.navigate(['/matches']);
    }
    if (responseJson.action == 'banThisUser') {
      this.router.navigate(['']);
    }

    if (responseJson.action == 'getThisUser') {
      //console.log('hey!', responseJson);
      this.newGifts = responseJson.newGifts > 0;
      this.profileViews = responseJson.profileViews;
      this.messageCount = responseJson.messages;

      if (responseJson.user && responseJson.user.user_id > 0) {
        this.matchUser = new User(responseJson.user, this.user);
        this.pageTitle = this.matchUser.firstName;
        this.calculatingStatsFlg = true;
        if (this.matchUser && this.matchUser.matchObj) {
          this.dateObj = this.matchUser.matchObj.dateObj;
          if (this.matchUser.matchObj.affirmedBy > 0 && this.matchUser.matchObj.affirmedBy == this.matchUser.user_id) {
            if (this.betraPopupComponent)
              this.betraPopupComponent.showPopup('You survived a Rose Ceremony!', this.matchUser.firstName + ' just completed a Rose Ceremony and you were one of the lucky singles who received a rose.', 5);

            this.getDataFromServer('clearAffirmationFlg', 'appApiCode2.php', { uid: this.matchUser.user_id });

          }

        }

        this.displayThisProfile();
        if (this.matchUser.newReviewBy > 0 && this.matchUser.user_id == this.user.user_id) {
          this.showNewReviewPopup = true;
          this.getDataFromServer('clearNewReviewFlg', 'betraReviews.php', []);
        }
      }
    }
    if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
    }
    if (responseJson.action == 'confirmPic' || responseJson.action == 'rejectPic') {
      this.showFakePicOptionsFlg = false;
      this.currentProfileIndex++;
      this.showCurrentProfile();
    }
  }

  /*populateViewChildren() {
    console.log('xxxpopulateViewChildren', this.messagesModal, this.matchSnapshotModal);
    if (this.messagesModal && this.messagesModal.populateModal)
      this.messagesModal.populateModal(this.matchUser, this.user);

    if (this.matchSnapshotModal) {
      this.matchSnapshotModal.initModal(this.matchUser, this.user, this.matchObj);
    }
  }*/

  showCurrentProfile() {
    console.log('++++showCurrentProfile', this.playerList.length, this.currentProfileIndex);
    if (this.profileViews <= 0 && this.id == 2)
      this.playerList = [];
    if (this.playerList.length > this.currentProfileIndex) {

      this.matchUser = this.playerList[this.currentProfileIndex];
      this.displayThisProfile();

    } else {
      this.matchUser = null;
      this.browseSingles('findMatches');
    }
  }

  displayThisProfile() {
    //console.log('displayThisProfile', this.matchUser.city, this.matchUser);
    if (this.matchUser) {
      //user browsing user
      if (this.userWallComponent)
        this.userWallComponent.loadMessages(this.user, this.matchUser);
      else {
        setTimeout(() => {
          this.userWallComponent.loadMessages(this.user, this.matchUser);
        }, 700);
      }
      this.getDataFromServer('logUserView', 'appApiCode2.php', { uid: this.matchUser.user_id });
    }

    if (this.matchSnapshotModal)
      this.matchSnapshotModal.initModal(this.matchUser, this.user, this.matchObj);
    else {
      console.log('no modal!!! try again in one second')
      setTimeout(() => {
        this.matchSnapshotModal.initModal(this.matchUser, this.user, this.matchObj);
      }, 1000);
    }

    this.messagesLoadingFlg = true;
    if (this.messagesModal) {
      this.messagesModal.populateModal(this.matchUser, this.user);
      this.messagesLoadingFlg = false;

    }
    else {
      console.log('no messagesModal!!! try again in one second')
      setTimeout(() => {
        this.messagesModal.populateModal(this.matchUser, this.user);
        this.messagesLoadingFlg = false;
      }, 1000);
    }
  }

  likeButtonClicked(likedFlg: boolean) {
    this.showYesNoButtonsFlg = false;
    if (likedFlg)
      this.matchSnapshotEvent('yesToMatch');
    else
      this.matchSnapshotEvent('noToMatch');
  }

  matchSnapshotEvent(action: string) {
    if (action == 'nextProfile') {
      this.currentProfileIndex++;
      this.showCurrentProfile();
      return;
    }
    if (action == 'remove')
      action = 'removeThisUser';
    if (action == 'ban')
      action = 'banThisUser';
    console.log('matchSnapshotEvent', action);

    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    console.log('this params!', params);
    if (this.user.user_id == this.matchUser.user_id && this.user.user_id != 1) {
      this.errorMessage = 'Invalid User for action ' + action;
    } else
      this.executeApi('appApiCode2.php', params, true);
  }

}
