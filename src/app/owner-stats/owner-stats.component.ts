import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-stats',
  templateUrl: './owner-stats.component.html',
  styleUrls: ['./owner-stats.component.scss']
})
export class OwnerStatsComponent extends BaseComponent implements OnInit {
  public statsPage: any = null;
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
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getStats') {
      this.statsPage = responseJson;
    }
  }
}
