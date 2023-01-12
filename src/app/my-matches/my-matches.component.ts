import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';
import { DatingPoolComponent } from '../dating-pool/dating-pool.component';

declare var $: any;
declare var lastLoginText: any;
declare var lastLoginColor: any;

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends BaseComponent implements OnInit {
  public menuButtons: any = ['My Dating Pool', 'Who I Like', 'Back Burner'];
  public playerList: any = [];
  public showMoreFlg = false;
  public showHeartFormFlg: boolean = false;
  public disableFormFlg: boolean = true;
  public showPopupFlg: boolean = false;
  public showDetailsNumber: number = 0;
  public datingPoolLimit: number = 8;
  public displayUserPopup: boolean = false;
  public matchUser: any = null;
  public selectedPerson: any = null;
  public origSelectedPerson: number = 0;

  @ViewChild(DatingPoolComponent) datingPoolComponent: DatingPoolComponent = new (DatingPoolComponent);

  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.user.datingPool.forEach((element: any) => {
      if (element.heartFlg)
        this.selectedPerson = element;
    });
    if (this.selectedPerson)
      this.origSelectedPerson = this.selectedPerson.user_id;

    this.route.queryParams.subscribe(params => {
      var menu = parseInt(params['menu']) || 0;
      this.changeMenu(menu);
      this.showHeartFormFlg = (this.user.datingPool.length >= 5 && this.user.heartId == 0);
      if (menu == 0 && this.user.datingPool.length == 0)
        this.showDetailsNumber = 1;
    })
  }

  chooseForRose(person: any) {
    this.selectedPerson = person;
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

    if (num == 3) {
      this.showHeartFormFlg = !this.showHeartFormFlg;
      this.menuNum = 0;
    } else
      this.showHeartFormFlg = false;

    if (num == 0) {
      var params0 = {
        userId: localStorage['user_id'],
        email: localStorage['email'],
        code: localStorage['code'],
        action: 'refreshDatingPool'
      };
      this.executeApi('appApiCode.php', params0, true);
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

  }
  assignHeart() {
    this.showHeartFormFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.selectedPerson.user_id,
      action: "assignHeart"
    };
    console.log(params);
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
    if (responseJson.action == 'yesToMatch') {
      return;
    }
    if (responseJson.action == 'removeThisUser' || responseJson.action == 'banThisUser') {
      this.syncUserWithLocalStorage(responseJson);

      this.user = new User(responseJson.user);
      console.log('xxx1', this.user.datingPool);
      //   if (this.datingPoolComponent)
      //     this.datingPoolComponent.ngOnInit();
    }
    if (responseJson.action == 'getThisUser') {
      this.displayUserPopup = true;
      this.matchUser = new User(responseJson.user);
    }
    if (responseJson.action == "logUser") {
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'assignHeart') {
      this.refreshUserObj(responseJson.user);
    }
    this.playerList = [];
    if (responseJson.action == 'refreshDatingPool') {
      console.log('xxxrefreshDatingPool', responseJson);
      this.refreshUserObj(responseJson.user);
      this.updateMatches();
      this.datingPoolLimit = (this.user.memberFlg) ? 12 : 8;
      this.showPopupFlg = this.user.datingPool && this.user.datingPool.length > this.datingPoolLimit;
      this.logUser();
    }
    if (responseJson.action == 'getMyLikes' || responseJson.action == 'getWhoLikesMe') {
      responseJson.playerList.forEach((element: { [x: string]: string; name: any; }) => {
        var src = this.getImageFile(element['user_id'], element['profilePic']);
        this.playerList.push({ name: element['name'], src: src, user_id: element['user_id'] })
      });
    }
  }
  getImageFile(user_id: string, profilePic: string) {
    return 'https://www.appdigity.com/betraPhp/profileImages/profile' + user_id + '_' + profilePic + '.jpg';
  }
  updateMatches() {
    this.user.datingPool.forEach((element: any) => {
      this.responseJson.matches.forEach((match: any) => {
        if (match.uid == element.user_id) {
          element.match = match;
          element.lastLoginText = lastLoginText(match.lastLogin);
          element.lastLoginColor = lastLoginColor(match.lastLogin);
          //console.log('+++M!+++', match);
          var alerts = 0;
          if (match.newMatchFlg == 'Y')
            alerts++;
          if (match.unreadMessages > 0)
            alerts += parseInt(match.unreadMessages);
          if (match.you_date_request == 'M' || match.match_date_request == 'M' || match.you_date_request == 'Y')
            alerts++;
          if (match.you_pic_request > 0)
            alerts++;
          if (match.match_info_request == 'Y')
            alerts++;
          if (match.newPics > 0)
            alerts++;
          if (match.uid == this.user.roseAssignedBy) {
            match.roseAssignedBy = this.user.roseAssignedBy;
            alerts++;
          }
          element.alerts = alerts;
        }
      });
    });
  }


}
