import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent extends BaseComponent implements OnInit {
  public messages: any = [];
  public lastMessage: number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('chatLogin', 'chat.php', { room: 1 });
  }

  playSound(num: number) {
    var sounds = [
      'assets/sounds/doorBell.mp3',
      'assets/sounds/Blop.mp3',
      'assets/sounds/doorClose.mp3'
    ];
    //console.log(sounds[num])
    var audio = new Audio(sounds[num]);
    audio.loop = false;
    audio.play();
  }

  loginToChat() {
    var e = document.getElementById('chat-room');
    if (e) {
      this.getDataFromServer('chatLogin', 'chat.php', { room: 1, lastMessage: this.lastMessage });
    } else {
      console.log('no chat!!!');
      this.getDataFromServer('exitChat', 'chat.php', {});

    }
  }

  sumbitReply(message: string) {
    this.getDataFromServer('sendMessage', 'chat.php', { message: message, room: 1, lastMessage: this.lastMessage });
  }

  override postSuccessApi(file: string, responseJson: any) {
    //console.log('xxx', responseJson, this.lastMessage);
    if (responseJson.action == "chatLogin") {
      //    this.playSound(0);
      if (responseJson.messages && responseJson.messages.length > 0) {
        if (this.lastMessage == 0)
          this.playSound(0);
        else {
          responseJson.messages.forEach((element: any) => {
            //console.log(element.newMsg, element.type);
            if (element.newMsg) {
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
      this.messages = responseJson.messages;

      this.messages.sort((a: any, b: any) => {
        return (parseInt(a.row_id) > parseInt(b.row_id)) ? 1 : (parseInt(a.row_id) < parseInt(b.row_id)) ? -1 : 0;
      });

      setTimeout(() => {
        this.loginToChat();
      }, 8000);
    }
  }
}
