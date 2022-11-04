import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends BaseComponent implements OnInit {
  public playerList: any = [];
  public messageCount:number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadNewMessages();
  }
  loadNewMessages() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: 'loadNewMessages'
    };
    this.executeApi('betraMessages.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'loadNewMessages') {
      this.messageCount = responseJson.messages.length;
      
      this.user.datingPool.forEach((element: any) => {
        element.messages = [];
        responseJson.messages.forEach((elementM: any) => {
          if (elementM.user_id == element.user_id)
            element.messages.push(elementM.message);
        });

        this.playerList.push(element);
      });
      console.log('playerList', this.playerList);
    }
  }

}
