import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-top-lists',
  templateUrl: './top-lists.component.html',
  styleUrls: ['./top-lists.component.scss']
})
export class TopListsComponent extends BaseComponent implements OnInit {
  public override topButtons = ['Likes', 'Newest', 'Online Now!'];
  public topListsPage: any = null;
  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getTop10List("getStats");
  }
  getTop10List(action: string) {
    this.responseJson = null;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: action
    };
    this.executeApi('appApiCode2.php', params, true);
  }
  selectMenu(num: number) {
    this.menuNum = num;
    var actions = ['getStats', 'getNewestUsers', 'getRecentUsers'];
    this.getTop10List(actions[num]);
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action != "logUser") {
      this.topListsPage = responseJson;
    }
  }

}
