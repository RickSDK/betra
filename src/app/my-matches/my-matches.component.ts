import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends BaseComponent implements OnInit {
  public menuNum: number = 0;
  public menuButtons: any = ['My Matches', 'Who I Like', 'Who Likes Me?'];
  public playerList: any = [];
  public showMoreFlg = false;
  public showHeartFormFlg: boolean = false;
  public disableFormFlg: boolean = true;

  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.showHeartFormFlg = this.user.showHeartFormFlg;
    this.route.queryParams.subscribe(params => {
      var menu = parseInt(params['menu']) || 0;
      this.changeMenu(menu);
    })
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
        action: 'logUser'
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
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'assignHeart') {
      this.refreshUserObj(responseJson.user);
    }
    this.playerList = [];
    if (responseJson.action == 'logUser' && responseJson.refreshFlg == 'Y') {
      console.log('refreshUser!');
      this.refreshUserObj(responseJson.user);
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

}
