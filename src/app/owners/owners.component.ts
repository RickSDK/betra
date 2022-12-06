import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent extends BaseComponent implements OnInit {
  public zone: string = '';

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.user && this.user.user_id > 0) {
      this.zone = this.user.adminZone;
      this.getMyOwnerInfo();
    }
  }
  getMyOwnerInfo() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getMyOwnerInfo",
      zone: this.zone
    };
    console.log('params', params);
    this.executeApi('owners.php', params, true);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getMyOwnerInfo') {
      if(responseJson.refreshFlg == 'Y') {
        console.log('refresh!');
        this.refreshUserObj(responseJson.user);
      }

    }

  }

}
