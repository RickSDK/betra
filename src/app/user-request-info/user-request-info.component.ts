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
  public dateMessageSentFlg: boolean = false;
  public sendMessage: string = '';
  public pictureTypes: any = [
    { id: 1, name: 'Selfie' },
    { id: 2, name: 'full body picture' },
    { id: 3, name: 'food picture' },
    { id: 4, name: 'goofey face' },
    { id: 5, name: 'dressed up' },
    { id: 6, name: 'sexy' },
  ];
  public requestObj = {
    date: 'empty',
    time: 'empty',
    location: 'empty',
    address: 'empty',
    city: 'empty',
    state: 'empty',
    zip: 'empty',
  }
  public modifyFlg: boolean = false;
  public declineDateFlg: boolean = false;
  public takePicFlg: boolean = false;
  

  constructor() { super(); }

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
  processRequestsRequest(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      comment: $('#comment').val(),
      dateId: (this.matchUser.matchObj && this.matchUser.matchObj.dateObj)?this.matchUser.matchObj.dateObj.row_id:'',
      action: action
    };
    console.log(params);
    this.executeApi('betraRequests.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.messageSentFlg = true;
    if(responseJson.action == 'acceptDate' || responseJson.action == 'cancelDate' || responseJson.action == 'rejectDate'  || responseJson.action == 'sendDateRequest' || responseJson.action == 'removeDate') {
      this.dateMessageSentFlg = true;
    }
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
  sendPictureRequest() {
    this.messageSentFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      picType: $('#pictureType').val(),
      action: 'sendPicRequest'
    };
    this.executeApi('betraRequests.php', params, true);
  }

  sendDateRequest() {
    this.errorMessage = '';
    this.requestObj = {
      date: $('#date').val(),
      time: $('#time').val(),
      location: $('#location').val(),
      address: $('#address').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      zip: $('#zip').val()
    }
    //console.log(this.requestObj);
    if (!this.requestObj.date || !this.requestObj.time || !this.requestObj.location || !this.requestObj.address || !this.requestObj.city || !this.requestObj.state || !this.requestObj.zip) {
      this.errorMessage = 'Fill out all required fields';
      return;
    }
    this.messageSentFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      date: $('#date').val(),
      time: $('#time').val(),
      location: $('#location').val(),
      address: $('#address').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      zip: $('#zip').val(),
      dateId: (this.matchUser.matchObj && this.matchUser.matchObj.dateObj)?this.matchUser.matchObj.dateObj.row_id:'',
      action: 'sendDateRequest'
    };
    //console.log(params);
    this.executeApi('betraRequests.php', params, true);
  }

}
