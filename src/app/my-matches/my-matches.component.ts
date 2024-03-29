import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';
import { DatingPoolComponent } from '../dating-pool/dating-pool.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';

declare var $: any;
declare var lastLoginText: any;
declare var lastLoginColor: any;
declare var betraImageFromId: any;

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends BaseComponent implements OnInit {
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  @ViewChild(DatingPoolComponent, { static: true })
  datingPoolComponent!: DatingPoolComponent;

  public menuButtons: any = ['Dating Pool', 'Waiting', 'Admirers', 'Dropped'];
  public playerList: any = [];
  public showMoreFlg = false;
  public disableFormFlg: boolean = true;
  public showPopupFlg: boolean = false;
  public showDetailsNumber: number = 0;
  public displayUserPopup: boolean = false;
  public matchUser: any = null;
  public selectedPerson: any = null;
  public origSelectedPerson: number = 0;
  public droppedBy: number = 0;
  public profilePic: number = 0;

  public showDroppedPopup: boolean = false;
  public topTitle: string = '';
  public firstName: string = '';
  public currentRoseHolder: string = '';
  public newlyAssignedRoseFlg: boolean = false;
  public daysTillRoseCeremony: number = 7;
  public datingPool: any = [];
  public timeForRoseFlg: boolean = false;
  public sortOption: string = '';
  public heartId: number = 0;

  //  @ViewChild(DatingPoolComponent)
  //private datingPoolComponent = {} as DatingPoolComponent;

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.topTitle = this.user.gender == 'F' ? 'My Dating Pool' : 'Dating Pool';

    this.firstName = '';
    this.user.datingPool.forEach((element: any) => {
      if (element.heartFlg) {
        this.currentRoseHolder = element.name;
        this.selectedPerson = element;
      }
    });
    if (this.selectedPerson)
      this.origSelectedPerson = this.selectedPerson.user_id;

    this.route.queryParams.subscribe(params => {
      var menu = parseInt(params['menu']) || 0;
      this.changeMenu(menu);
    });

    if (localStorage['infoObj']) {
      this.infoObj = JSON.parse(localStorage['infoObj']);
      if (this.infoObj.droppedBy > 0) {
        this.getDataFromServer('clearDroppedColumn', 'appApiCode2.php', []);
      }
    }

  }

  chooseForRose(person: any) {
    this.selectedPerson = person;
    this.newlyAssignedRoseFlg = false;
    this.disableFormFlg = (this.selectedPerson.user_id == this.origSelectedPerson);
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  loadPopupUser(uid: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: uid,
      action: "getThisUser"
    };
    this.executeApi('appApiCode2.php', params, true);
  }

  userClickedOnPage(event: any) {
    var e = document.getElementById('user-popup');
    if (e) {
      var divRect = e.getBoundingClientRect();
      if (event.clientX >= divRect.left && event.clientX <= divRect.right &&
        event.clientY >= divRect.top && event.clientY <= divRect.bottom) {
        // do nothing; console.log('yes!');
      } else
        this.displayUserPopup = false;
    }

  }

  refreshDatingPool() {
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      action: 'refreshDatingPool'
    };
    this.executeApi('appApiCode.php', params, true);
  }

  toggleShowDetailsNumber(num: number) {
    if (num == this.showDetailsNumber)
      this.showDetailsNumber = 0;
    else
      this.showDetailsNumber = num;
  }

  changeMenu(num: number) {
    this.menuNum = num;
    this.playerList = [];

    if (num == 0) {
      this.getDataFromServer('refreshDatingPool', 'appApiCode.php', {});
    }
    if (num == 1) {
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        action: "getMyLikes"
      };
      this.executeApi('appApiCode2.php', params, true);
    }
    if (num == 2) {
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        action: "getWhoLikesMe"
      };
      this.executeApi('appApiCode2.php', params, true);
    }
    if (num == 3)
      this.getDataFromServer('whoDroppedMe', 'appApiCode2.php', {});

  }
  assignHeart() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.selectedPerson.user_id,
      action: "assignHeart"
    };
    console.log(params);
    this.currentRoseHolder = this.selectedPerson.name;
    this.executeApi('appApiCode2.php', params, true);
  }

  ngClassButton(num: number) {
    if (num == this.menuNum)
      return 'btn btn-main-color';
    else
      return 'btn btn-secondary';
  }

  matchSnapshotEvent(action: any) {
    this.displayUserPopup = false;
    if (action == 'close-popup') {
      return;
    }

    if (action == 'remove')
      action = 'removeThisUser';
    if (action == 'ban')
      action = 'banThisUser';

    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    console.log('matchSnapshotEvent params!', params);
    this.executeApi('appApiCode2.php', params, true);
  }

  addPersonToDP(person: any) {
    if (this.user.datingPool.length > 22) {
      this.betraPopupComponent.showPopup('Dating Pool Full!', 'Sorry, your dating pool is maxed out. You can only add new people if you are under 20 people in your pool. Wait until your next Rose Ceremony.');
      return;
    }
    var playerList: any = [];
    this.playerList.forEach((element: any) => {
      if (element.user_id != person.user_id)
        playerList.push(element);
    });
    this.playerList = playerList;

    var params = {
      matchId: person.user_id,
    };
    this.getDataFromServer('yesToMatch', 'appApiCode2.php', params);
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'clearDroppedColumn') {
      this.infoObj.droppedBy = responseJson.droppedBy;
      this.droppedBy = responseJson.droppedBy;
      this.firstName = responseJson.firstName;
      this.profilePic = responseJson.profilePic;
      this.infoObj.profilePic = responseJson.profilePic;
      this.showDroppedPopup = true;
    }
    if (responseJson.action == 'yesToMatch') {
      return;
    }
    if (responseJson.action == 'removeThisUser' || responseJson.action == 'banThisUser') {
      this.syncUserWithLocalStorage(responseJson);

      this.user = new User(responseJson.user);
      //console.log('xxx1', this.user.datingPool);
      //   if (this.datingPoolComponent)
      //     this.datingPoolComponent.ngOnInit();
    }
    if (responseJson.action == 'getThisUser') {
      this.displayUserPopup = true;
      this.matchUser = new User(responseJson.user);
    }
    if (responseJson.action == 'assignHeart') {
      this.refreshUserObj(responseJson.user);
      this.newlyAssignedRoseFlg = true;
    }
    if (responseJson.action == 'refreshDatingPool') {
      console.log('xxxrefreshDatingPool', responseJson);

      if (responseJson.user.dating_pool != this.user.dating_pool) {
        console.log('out of sync!!');
        var dp = responseJson.user.dating_pool.split('+');
        console.log('dp', dp);
        var dp2 = this.user.dating_pool.split('+');
        console.log('dp2', dp2);
        this.refreshUserObj(responseJson.user);
      }
      this.heartId = responseJson.heartId;
      this.daysTillRoseCeremony = parseInt(responseJson.daysTillRoseCeremony || 0);

      this.timeForRoseFlg = false;

      if (this.daysTillRoseCeremony > 0 && this.daysTillRoseCeremony <= 4 && parseInt(responseJson.heartId) == 0) {
        this.menuNum = 4;
        this.timeForRoseFlg = true;
      }


      if (this.daysTillRoseCeremony <= 0 && this.user.datingPool.length>20)
        this.betraPopupComponent.showPopup('Rose Ceremony Time!', 'It has been 7 days since your last rose ceremony, so time for a new ceremony. You will hand out roses to your favorite people, and eliminate a few that you are not interested in.', 99);

      this.updateMatches();
      if (this.datingPoolComponent)
        this.datingPoolComponent.refreshDatingPool(this.user.datingPool);
      //

      //this.logUser();
    }
    if (responseJson.action == 'getMyLikes' || responseJson.action == 'getWhoLikesMe' || responseJson.action == 'whoDroppedMe') {
      this.playerList = [];
      responseJson.playerList.forEach((element: { [x: string]: string; name: any; }) => {
        var src = this.getImageFile(element['user_id'], element['profilePic']);
        this.playerList.push({ name: element['name'], src: src, user_id: element['user_id'], profilePic: element['profilePic'] })
      });
    }
  }
  getImageFile(user_id: string, profilePic: string) {
    return betraImageFromId(user_id, profilePic);
    //    return 'https://www.betradating.com/betraPhp/profileImages/profile' + user_id + '_' + profilePic + '.jpg';
  }
  sortList() {
    this.sortOption = $('#sortOption').val();
  }
  updateMatches() {
    this.datingPool = [];
    this.user.datingPool.forEach((element: any) => {
      this.responseJson.matches.forEach((match: any) => {
        if (match.uid == element.user_id) {
          element.match = match;
          element.minAgo = match.minAgo;
          element.lastLoginText = lastLoginText(match.lastLogin);
          element.lastLoginColor = lastLoginColor(match.lastLogin);
          //console.log('+++M!+++', match);
          var alerts = 0;
          if (match.newMatchFlg == 'Y')
            alerts++;
          if (match.newGifts > 0)
            alerts += parseInt(match.newGifts);
          if (match.unreadMessages > 0)
            alerts += parseInt(match.unreadMessages);
          if (match.you_date_request == 'M' || match.match_date_request == 'M' || match.you_date_request == 'Y')
            alerts++;
          if (match.you_pic_request > 0) {
            alerts++;
            element.pictureAlert = true;
          }
          if (match.match_info_request == 'Y')
            alerts++;

          if (match.affirmedBy > 0 && match.affirmedBy != this.user.user_id) {
            alerts++;
            element.roseAlert = true;
          }

          if (match.newPics > 0)
            alerts++;
          if (match.uid == this.user.roseAssignedBy) {
            match.roseAssignedBy = this.user.roseAssignedBy;
            alerts++;
          }
          element.alerts = alerts;
        }
      });
      this.datingPool.push(element);
    });
    this.sortOption = 'Most Recent';
  }




}
