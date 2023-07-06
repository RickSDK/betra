import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { WebsocketService } from '../websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent extends BaseComponent implements OnInit {
  public messages: any = [];
  public lastMessage: number = 0;
  public chatRoom: any = null;
  public happyHourNotice: string = '';
  public showMoreFlg: boolean = false;
  public lotsOfMessagesFlg: boolean = false;
  public textValue: string = '';
  public isConnected: boolean = true;
  public usersOnline: any = [];
  public numberChatRefreshes: number = 0;
  public socket: WebsocketService;
  public userHash:any = {};

  constructor(private router: Router, webSocketService: WebsocketService, databaseService: DatabaseService) {
    super(databaseService);
    this.socket = webSocketService;
    this.socket.connect();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.isConnected = true;
    this.getDataFromServer('chatLogin', 'chat.php', { room: 1 });
  }

  playSound(num: number) {
    var sounds = [
      'assets/sounds/doorBell.mp3',
      'assets/sounds/Blop.mp3',
      'assets/sounds/doorClose.mp3'
    ];
    var audio = new Audio(sounds[num]);
    audio.loop = false;
    audio.play();
  }

  loginToChat() {
    var e = document.getElementById('chat-room');
    if (e) {
      this.isConnected = true;
      this.getDataFromServer('chatLogin', 'chat.php', { room: 1, lastMessage: this.lastMessage });
    } else if (this.isConnected) {
      this.isConnected = false;
      this.getDataFromServer('exitChat', 'chat.php', {});
    }
  }

  sumbitReply(message: string) {
    this.numberChatRefreshes = 0;
    this.getDataFromServer('sendMessage', 'chat.php', { message: message, room: 1, lastMessage: this.lastMessage });
  }

  populateHappyHour(str: string) {
    this.happyHourNotice = str;
    var c = str.split(':');
    if (c.length > 2) {
      var hour = parseInt(c[0]);
      var min = parseInt(c[1]);
      var sec = parseInt(c[2]);

      if (hour > 18)
        this.happyHourNotice = 'Tomorrow at 5pm';
      if (hour == 18)
        this.happyHourNotice = 'Now!';
      if (hour == 17) {
        this.happyHourNotice = 'Starting In ' + (60 - min).toString() + ' minutes';
      }
      if (hour == 16) {
        this.happyHourNotice = 'In about an hour';
      }
      if (hour < 16) {
        this.happyHourNotice = 'In about ' + (18 - hour).toString() + ' hours';
      }

    }
  }

  messageClicked(message: any) {
    this.textValue = '@' + message.firstName + ': ';
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == "chatLogin") {
      this.numberChatRefreshes++;
      this.chatRoom = responseJson;
      this.populateHappyHour(responseJson.currentTime);
      if (responseJson.messages && responseJson.messages.length > 0) {
        if (this.lastMessage > 0) {
          var allowSound = true;
          var count = 0;
          this.lotsOfMessagesFlg = false;
          responseJson.messages.forEach((element: any) => {
            if (count++ > 15) {
              element.olderFlg = true;
              this.lotsOfMessagesFlg = true;
            }
            if (element.newMsg && allowSound) {
              allowSound = false;
              if (element.type == 'S')
                this.playSound(0);
              if (!element.type)
                this.playSound(1);
              if (element.type == 'X')
                this.playSound(2);
            }
          });

        }
        this.lastMessage = responseJson.messages[0].row_id;

      }
      this.messages = [];
      var messageHash: any = {};
      responseJson.messages.forEach((element: any) => {
        if (!messageHash[element.message])
          this.messages.push(element);
        messageHash[element.message] = true;
      });

      responseJson.users.forEach((element: any) => {
        this.userHash[element.user_id]=true;
      });
      

      this.messages.sort((a: any, b: any) => {
        return (parseInt(a.row_id) > parseInt(b.row_id)) ? 1 : (parseInt(a.row_id) < parseInt(b.row_id)) ? -1 : 0;
      });

      this.chatRoom.activity.sort((a: any, b: any) => {
        return (parseInt(a.row_id) > parseInt(b.row_id)) ? 1 : (parseInt(a.row_id) < parseInt(b.row_id)) ? -1 : 0;
      });

      if(this.numberChatRefreshes>20) {
        this.getDataFromServer('exitChat', 'chat.php', {});
        this.router.navigate(['']);
        return;
      }
      if (!responseJson.noRefresh) {
        setTimeout(() => {
          console.log('refresh chat', this.numberChatRefreshes);
          this.loginToChat();
        }, 8000);
      }
    }
  }
}
