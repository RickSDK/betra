import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  public notifications: number = 0;
  public users_interested: number = 0;
  public users_interested_text: string = '';

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
    this.users_interested = responseJson['users_interested'];
    this.users_interested_text = (this.users_interested == 1) ? 'person' : 'people';

    this.notifications = this.users_interested;
    localStorage['notifications'] = '';
  }

}
