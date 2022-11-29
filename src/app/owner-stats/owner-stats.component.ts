import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-stats',
  templateUrl: './owner-stats.component.html',
  styleUrls: ['./owner-stats.component.scss']
})
export class OwnerStatsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getStats();
  }
  getOwnerUsers() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getOwnerUsers"
    };
    this.executeApi('owners.php', params, true);
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
}
