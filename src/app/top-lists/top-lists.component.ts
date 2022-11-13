import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-top-lists',
  templateUrl: './top-lists.component.html',
  styleUrls: ['./top-lists.component.scss']
})
export class TopListsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getStats();
  }
  getStats() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getStats"
    };
    console.log(params);
    this.executeApi('appApiCode2.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.responseJson = responseJson;
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getReviews') {

    }
  }

}
