import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;

  public requestNum: number = 0;
  public messageSentFlg: boolean = false;
  public sendMessage: string = '';

  public buttonsDisabledFlg: boolean = false;
  public openPanelFlg: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
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
  picUploadTriggered(action: string) {
    console.log('made it back to top', action);
    if (action == 'uploadComplete') {
      //this.matchUser.matchObj.you_pic_request = 0;
      this.checkButtons();
    }
  }
  dateTriggered(action: string) {
    console.log('made it back to top', action);
    this.checkButtons();
  }
}
