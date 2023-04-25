import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends BaseComponent implements OnInit {
  public playerList: any = [];
  public messageCount: number = 0;
  public override topButtons: any = ['Dating Pool', 'Unread messages'];

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.menuNum = parseInt(params['id']) || 0;
    });
    this.selectMenuOption(this.menuNum);
 //   this.logUser();
  }

  selectMenuOption(num: number) {
    this.menuNum = num;
    this.playerList = [];
    if (num == 0)
      this.getDataFromServer('loadUserMessages', 'betraMessages.php', []);
    else
      this.getDataFromServer('loadUnreadMessages', 'betraMessages.php', []);
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'loadUserMessages' || responseJson.action == 'loadUnreadMessages') {
      this.playerList = [];
      if (responseJson.players && responseJson.players.length > 0 && responseJson.players[0].user_id > 0)
        this.playerList = responseJson.players;

      this.playerList.sort((a: any, b: any) => {
        return b.row_id - a.row_id;
      });
    }
  }

}
