import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { WebsocketService } from '../websocket.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent extends BaseComponent implements OnInit {
  public myWebSocket: any;

  constructor(databaseService: DatabaseService, private wsService: WebsocketService) {
    super(databaseService);
    this.wsService.messages.subscribe((msg: any) => {
      console.log('Response: ', msg)
    });
  }

  private message:any = {
    source: 'betra user',
    content: 'test message'
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.wsService.sendMessage(this.message);

    //this.myWebSocket = webSocket('ws://www.betradating.com/betraPhp/websockets.php');

  }

}
