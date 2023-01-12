import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  public notificationsTypes = [
    { name: 'Users Interested', amount: 0, desc: 'You have someone interested in you!' },
    { name: 'Users Matched', amount: 0, desc: 'You have a new match!' },
    { name: 'Questions Asked', amount: 0, desc: 'Someone has asked you a question!' },
    { name: 'Dates Requested', amount: 0, desc: 'Someone has requested a date!' },
    { name: 'Messages Received', amount: 0, desc: 'You have received new messages!' },
    { name: 'Info Requested', amount: 0, desc: 'Someone has requested your info!' },
    { name: 'Picture Requested', amount: 0, desc: 'Someone has requested your picture!' },
    { name: 'Picture Received', amount: 0, desc: 'Someone has sent you a picture!' },
    { name: 'Dropped', amount: 0, desc: 'Sorry, but someone has dropped you from their dating pool.' },
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
    if (responseJson.action == 'getNotifications' && responseJson.infoObj) {

      this.notificationsTypes[0].amount = responseJson.infoObj.admirerCount;
      this.notificationsTypes[1].amount = responseJson.infoObj.users_matched;
      this.notificationsTypes[3].amount = responseJson.infoObj.dateRequestCount;
      this.notificationsTypes[4].amount = responseJson.infoObj.messageCount;
      this.notificationsTypes[5].amount = responseJson.infoObj.infoRequestCount;
      this.notificationsTypes[6].amount = responseJson.infoObj.picRequestCount;
      this.notificationsTypes[7].amount = responseJson.infoObj.newPicsCount;
      this.notificationsTypes[8].amount = (responseJson.infoObj.droppedBy>0)?1:0;

      var notifications = 0;
      this.notificationsTypes.forEach(element => {
        notifications += parseInt(element.amount.toString());
      });

      this.headerObj.notifications = notifications;
      localStorage['notifications'] = notifications;

    }
  }

}
