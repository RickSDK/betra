import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent implements OnInit {
 
  public notificationsTypes: any = [];

  constructor(databaseService: DatabaseService) { super(databaseService); }

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
      console.log('notifications', responseJson.infoObj);
      this.notificationsTypes = this.getNotificationsTypesFromInfoObj(responseJson.infoObj);
    }
  }

}
