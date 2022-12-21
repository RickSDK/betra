import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var lastLoginText: any;
declare var lastLoginColor: any;

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends BaseComponent implements OnInit {
  public menuButtons: any = ['My Dating Pool', 'Who I Like', 'Who Likes Me?'];
  public playerList: any = [];
  public showMoreFlg = false;
  public showHeartFormFlg: boolean = false;
  public disableFormFlg: boolean = true;
  public showPopupFlg: boolean = false;
  public showDetailsNumber: number = 0;

  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      var menu = parseInt(params['menu']) || 0;
      this.changeMenu(menu);
      this.showHeartFormFlg = (this.user.datingPool.length >= 5 && this.user.heartId == 0);
    })
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
      uid: $('#assignHeart').val(),
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
  override postSuccessApi(file: string, responseJson: any) {
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
      this.showPopupFlg = this.user.datingPool && this.user.datingPool.length > 8;
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
          if (match.you_date_request == 'M' || match.match_date_request == 'M' || match.match_date_request == 'A' || match.match_date_request == 'Y' || match.you_date_request == 'Y')
            alerts++;
          if (match.you_pic_request > 0)
            alerts++;
          if (match.match_info_request == 'Y')
            alerts++;
          if (match.newPics > 0)
            alerts++;
          if(match.uid == this.user.roseAssignedBy) {
            match.roseAssignedBy = this.user.roseAssignedBy;
            alerts++;
          }
          element.alerts = alerts;
        }
      });
    });
  }


}
