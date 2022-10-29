import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent extends BaseComponent implements OnInit {
  public menuNum: number = 0;
  public menuButtons: any = ['My Matches', 'Who I Like', 'Who Likes Me?'];
  public playerList: any = [];
  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      var menu = params['menu'] || 0;
      this.changeMenu(menu);
    })
  }

  changeMenu(num: number) {
    this.menuNum = num;

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
  ngClassButton(num: number) {
    if (num == this.menuNum)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.playerList = [];
    if (1 || responseJson.action == 'getMyLikes') {
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
