import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-request-pic',
  templateUrl: './user-request-pic.component.html',
  styleUrls: ['./user-request-pic.component.scss']
})
export class UserRequestPicComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  @Input('requestNum') requestNum: number = 0;


  public takePicFlg: boolean = false;
  public messageSentFlg: boolean = false;
  public pictureType: string = 'test';
  public pictureTypes: any = [
    { id: 1, name: 'Selfie' },
    { id: 2, name: 'full body picture' },
    { id: 3, name: 'food picture' },
    { id: 4, name: 'goofey face' },
    { id: 5, name: 'dressed up' },
    { id: 6, name: 'sexy' },
  ];

  constructor() { super(); }

  override ngOnInit(): void {

    if (this.matchUser.matchObj.you_pic_request && this.matchUser.matchObj.you_pic_request > 0)
      this.pictureType = this.pictureTypes[this.matchUser.matchObj.you_pic_request - 1].name;
  }

  uploadImage(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      mid: this.matchUser.matchObj.row_id,
      action: 'uploadSpecialImage',
      image: $('#myImg').attr('src')
    };
    this.executeApi('betraRequests.php', params, true);
    console.log('uploadImage!!', params);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'uploadSpecialImage') {
      this.messageSentFlg = true;
      this.messageEvent.emit('uploadComplete');
    }
    if (responseJson.action == 'sendPicRequest') {
      this.messageSentFlg = true;
    }
  }
  processRequestsRequest(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      comment: $('#comment').val(),
      picType: $('#pictureType').val(),
      dateId: (this.matchUser.matchObj && this.matchUser.matchObj.dateObj) ? this.matchUser.matchObj.dateObj.row_id : '',
      action: action
    };
    console.log(params);
    this.executeApi('betraRequests.php', params, true);
  }

}
