import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  public notificationsTypes = [
    {name: 'Users Interested', amount: 0, desc: 'You have someone interested in you!'},
    {name: 'Users Matched', amount: 0, desc: 'You have a new match!'},
    {name: 'Questions Asked', amount: 0, desc: 'Someone has asked you a question!'},
    {name: 'Dates Requested', amount: 0, desc: 'Someone has requested a date!'},
    {name: 'Messages Received', amount: 0, desc: 'You have received new messages!'},
    {name: 'Info Requested', amount: 0, desc: 'Someone has requested your info!'},
  ]

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadNotifications();
  }

  loadNotifications() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: 'getNotifications'
    };
    this.executeApi('appApiCode2.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
 
    this.notificationsTypes[0].amount = responseJson['users_interested'];
    this.notificationsTypes[1].amount = responseJson['users_matched'];
    this.notificationsTypes[2].amount = responseJson['questions_asked'];
    this.notificationsTypes[3].amount = responseJson['dates_requested'];
    this.notificationsTypes[4].amount = responseJson['messages_received'];
    this.notificationsTypes[5].amount = responseJson['info_requested'];
    
    var users_interested = parseInt(responseJson['users_interested']) || 0;
    var users_matched = parseInt(responseJson['users_matched']) || 0;
    var questions_asked = parseInt(responseJson['questions_asked']) || 0;
    var dates_requested = parseInt(responseJson['dates_requested']) || 0;
    var messages_received = parseInt(responseJson['messages_received']) || 0;
    var info_requested = parseInt(responseJson['info_requested']) || 0;

    this.notifications = users_interested + users_matched + questions_asked + dates_requested + messages_received + info_requested;

    localStorage['notifications'] = this.notifications;
  }

}
