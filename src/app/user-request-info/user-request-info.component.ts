import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-user-request-info',
  templateUrl: './user-request-info.component.html',
  styleUrls: ['./user-request-info.component.scss']
})
export class UserRequestInfoComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  @Input('requestNum') requestNum: number = 0;

  public messageSentFlg: boolean = false;
  public sendMessage: string = '';

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }
  
  processAPIRequest(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    this.executeApi('betraMessages.php', params, true);
  }

  override postSuccessApi(file: string, responseJson: any) {
    this.messageSentFlg = true;
    if (responseJson.action == 'requestInfo') {
      this.sendMessage = 'Request Sent!';
    }
    if (responseJson.action == 'rejectInfoRequest') {
      this.sendMessage = 'Rejection Confirmed';
    }
    if (responseJson.action == 'approveInfoRequest' || responseJson.action == 'readMessages') {
      this.sendMessage = 'Request Approved and sent!';
    }
  }

}
