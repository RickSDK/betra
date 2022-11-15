import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-request-info',
  templateUrl: './user-request-info.component.html',
  styleUrls: ['./user-request-info.component.scss']
})
export class UserRequestInfoComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;

  public requestNum: number = 0;
  public messageSentFlg: boolean = false;
  public sendMessage: string = '';

  public buttonsDisabledFlg: boolean = false;
  public openPanelFlg: boolean = false;


  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.user)
      return;


  }
  openPanel() {
    this.openPanelFlg = !this.openPanelFlg;
    this.requestNum = 0;
    if (this.openPanelFlg)
      this.checkButtons();
  }
  checkButtons() {
    this.buttonsDisabledFlg = this.matchUser.matchObj.match_date_request == 'M' || this.matchUser.matchObj.you_date_request == 'Y' || this.matchUser.matchObj.you_pic_request > 0;
  }

  changeNum(num: number) {
    this.sendMessage = '';
    if (num == this.requestNum)
      this.requestNum = 0;
    else
      this.requestNum = num;
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
  picUploadTriggered(action: string) {
    if (action == 'uploadComplete') {
      this.matchUser.matchObj.you_pic_request = 0;
      this.checkButtons();
    }
  }
  dateTriggered(action: string) {
    this.checkButtons();
  }



}
