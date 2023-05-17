import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { Router } from '@angular/router';
import { UserCommunicationComponent } from '../user-communication/user-communication.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {

  @ViewChild(MatchSnapshotComponent)
  private matchSnapshotModal = {} as MatchSnapshotComponent;
  @ViewChild(UserCommunicationComponent)
  private messagesModal = {} as UserCommunicationComponent;

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
    if (this.id != 4 && (this.user.exceededPoolSizeFlg || this.user.showHeartFormFlg)) {
      console.log('exxeced!');
      //      this.logUser('Y');
      return;
    }
    this.searchStarted = true;
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      gender: this.user.gender,
      matchPreference: this.user.matchPreference,
      lat: Math.round(this.user.latitude),
      lng: Math.round(this.user.longitude),
      matchAgeYear: this.user.matchAgeYear,
      matchAgeRange: this.user.matchAgeRange,
      localsOnly: (this.showExpandedSearchPopupFlg) ? 'Y' : '',
      action: action
    };
    console.log('params', params);
    this.executeApi('findMatches.php', params, true);
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
        //console.log('xxxthis.playerList (sorted)', this.playerList);

        //this.playerList.forEach((element: any) => {
        //console.log(element.firstName, element.matchQualityIndex, element.lastLoginText, element.isGoodActivity, element.age, element.isGoodAge, element.distanceText, element.isGoodLocation);
        //});
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

      this.matchUser = new User(responseJson.user, this.user);
      this.messageCount = responseJson.messages;
      this.pageTitle = this.matchUser.firstName;
      this.calculatingStatsFlg = true;
      if (this.matchUser && this.matchUser.matchObj)
        this.dateObj = this.matchUser.matchObj.dateObj;

      this.displayThisProfile();
      //this.logUser();
      if (this.matchUser.newReviewBy > 0 && this.matchUser.user_id == this.user.user_id) {
        this.showNewReviewPopup = true;
        this.getDataFromServer('clearNewReviewFlg', 'betraReviews.php', []);
      } else {
        //this.logUser(); // this syncs up notifications
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

  populateViewChildren() {
    if (this.messagesModal)
      this.messagesModal.populateModal(this.matchUser, this.user);

    if (this.matchSnapshotModal) {
      this.matchSnapshotModal.initModal(this.matchUser, this.user, this.matchObj);
    }
  }

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
    console.log('displayThisProfile', this.matchUser);
    if (this.matchUser) {
      this.getDataFromServer('logUserView', 'chat.php', { uid: this.matchUser.user_id });
    }

    if (this.matchSnapshotModal)
      this.populateViewChildren();
    else {
      console.log('no modal!!! try again in one second')
      setTimeout(() => {
        this.populateViewChildren();
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
