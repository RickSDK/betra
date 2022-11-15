import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-request-date',
  templateUrl: './user-request-date.component.html',
  styleUrls: ['./user-request-date.component.scss']
})
export class UserRequestDateComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  @Input('requestNum') requestNum: number = 0;
  public messageSentFlg: boolean = false;
  public modifyFlg: boolean = false;
  public declineDateFlg: boolean = false;

  public requestObj = {
    date: 'empty',
    time: 'empty',
    location: 'empty',
    address: 'empty',
    city: 'empty',
    state: 'empty',
    zip: 'empty',
  }
  constructor() { super(); }

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
      dateId: (this.matchUser.matchObj && this.matchUser.matchObj.dateObj) ? this.matchUser.matchObj.dateObj.row_id : '',
      action: 'sendDateRequest'
    };
    //console.log(params);
    this.executeApi('betraRequests.php', params, true);
  }
  processRequestsRequest(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      comment: $('#comment').val(),
      dateId: (this.matchUser.matchObj && this.matchUser.matchObj.dateObj) ? this.matchUser.matchObj.dateObj.row_id : '',
      action: action
    };
    console.log(params);
    this.executeApi('betraRequests.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.messageSentFlg = true;
  }

}
