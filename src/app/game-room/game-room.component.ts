import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { WebsocketService } from '../websocket.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

declare var $: any;
declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent extends BaseComponent implements OnInit {
  public myWebSocket: any;
  public showRulesFlg: boolean = false;
  public page: any = {};
  public scheduledGames: any = [];
  public iHaveGameScheduled: boolean = false;

  constructor(databaseService: DatabaseService, private wsService: WebsocketService) {
    super(databaseService);
  }

  private message: any = {
    source: 'betra user',
    content: 'test message'
  }

  override ngOnInit(): void {
    super.ngOnInit();

    //this.wsService.sendMessage(this.message);
    this.getDataFromServer('checkUsers', 'iNever.php', { room: 1 });

    //this.myWebSocket = webSocket('ws://www.betradating.com/betraPhp/websockets.php');

  }

  scheduleGame() {
    var gameDate = $('#gameDate').val();
    var gameTime = $('#gameTime').val();
    if (gameDate == '') {
      this.errorMessage = 'Enter a date';
      return;
    }
    if (gameTime == '') {
      this.errorMessage = 'Enter a time';
      return;
    }
    var params = {
      gameDate: gameDate,
      gameTime: gameTime,
    }
    console.log(params);
    this.getDataFromServer('scheduleGame', 'iNever.php', params);
  }

  deleteScheduledGame(game:any) {
    this.getDataFromServer('deleteScheduledGame', 'iNever.php', {});

  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action != "logUser") {
      this.page = responseJson;
      this.scheduledGames = responseJson.scheduledGames;
      this.iHaveGameScheduled = false;
      this.scheduledGames = []
      responseJson.scheduledGames.forEach((element: any) => {
        var dt = getDateObjFromJSDate(element.gameTime);
        element.dt = dt;
        console.log('xxx', dt);
        if(dt.hoursFromNow >=0)
          this.scheduledGames.push(element);
        if (element.isMine)
          this.iHaveGameScheduled = true;
      });

    }
  }

}
