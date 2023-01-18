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
    this.getDataFromServer('loadUserMessages', 'betraMessages.php', []);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'loadUserMessages') {
      this.playerList = [];
      if(responseJson.players && responseJson.players.length>0 && responseJson.players[0].user_id>0)
        this.playerList = responseJson.players;
      console.log('playerList', this.playerList);
    }
  }

}
