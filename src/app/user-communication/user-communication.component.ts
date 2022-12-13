import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;
declare var getDateObjFromJSDate: any;

@Component({
  selector: 'app-user-communication',
  templateUrl: './user-communication.component.html',
  styleUrls: ['./user-communication.component.scss']
})
export class UserCommunicationComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  public showDetailsFlg: boolean = false;
  public showTextInputFlg = false;
  public selectedMessage: number = 0;
  public firstName: string = '';
  public unreadMessagesFlg: boolean = false;

  public greetings = [
    'Hi!',
    'Hello gorgeous.',
    'Hey, hows it going?',
    'Whats up?',
    'You are so beautiful.',
    'Howdy!',
    'Que pasa?',
    'Greetings.'
  ]
  public questions = [
    'What is your favorite animal?',
    'How is the dating world?',
    'What is the last movie you saw?',
    'What is your favorite sports team?',
    'What is your favorite restaurant?',
    'What do you like to do for fun?',
  ];
  public messageSentFlg: boolean = false;
  public disabledButtonFlg: boolean = true;
  public messages: any = [];
  public messageStr: string = '';

  constructor() { super(); }

  override ngOnInit(): void {
    //super.ngOnInit();
    this.populateModal(this.matchUser);
  }
  populateModal(matchUser: any) {
    console.log('populate modal');
    this.messages = [];
    this.matchUser = matchUser;

    this.firstName = this.matchUser.firstName;

    if (this.matchUser && this.matchUser.matchObj) {
      this.checkTextFlags();

      if (this.matchUser.matchObj.match_level > 2)
        this.loadMessages();
    }
  }
  checkTextFlags() {
    this.showTextInputFlg = false;
    if (this.matchUser.matchObj.match_level == 3 && this.matchUser.matchObj.you_action == 'Interested')
      this.showTextInputFlg = true;
    if (this.matchUser.matchObj.match_level == 4 && this.matchUser.matchObj.match_action == 'reply sent')
      this.showTextInputFlg = true;
    if (this.matchUser.matchObj.match_level > 4)
      this.showTextInputFlg = true;
  }
  loadMessages(loadMoreFlg: boolean = false) {
    this.messages = [];
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      loadMoreFlg: (loadMoreFlg) ? 'Y' : '',
      action: "readMessages"
    };
    console.log(params);
    this.executeApi('betraMessages.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('got messages');
    if (responseJson.action == "readMessages" || responseJson.action == "sendMessage" || responseJson.action == "deleteMessage") {
      var showDetailsFlg = false;
      this.messages = [];
      this.responseJson.messages.forEach((message: any) => {
        var dt = getDateObjFromJSDate(message.created);
        if (!message.readDt)
          showDetailsFlg = true;
        if (message.uid == this.myUser.user_id && !message.readDt)
          this.unreadMessagesFlg = true;
        message.name = (message.user_id == this.myUser.user_id) ? this.myUser.firstName : this.matchUser.firstName;
        message.local = dt.local;
        this.messages.push(message);
      });
      this.showDetailsFlg = showDetailsFlg;
      if (this.messages.length <= 2)
        this.showDetailsFlg = true;

      if (responseJson.refreshFlg == 'Y') {
        localStorage['messageCount'] = responseJson.messageCount;
        this.headerObj.messageCount = responseJson.messageCount;
      }

      this.messages.sort((a: any, b: any) => {
        return a.id - b.id;
      });
    }
  }
  sendMessage() {
    this.messageSentFlg = true;
    this.showTextInputFlg = (this.matchUser.matchObj.match_level >= 4);
    $('#messageInput').val('');
    this.disabledButtonFlg = true;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      message: this.messageStr,
      action: "sendMessage"
    };
    console.log('params', params);
    this.executeApi('betraMessages.php', params, true);
  }
  ngClassMessage(user_id: number) {
    if (user_id == this.myUser.user_id)
      return 'pull-left';
    else
      return 'pull-right';
  }
  ngClassMessageBlob(user_id: number) {
    if (user_id == this.myUser.user_id)
      return 'gray-blob';
    else
      return 'blue-blob';
  }
  questionValueChanged() {
    var greeting = $('#greetingText').val();
    var question = $('#questionText').val();
    this.disabledButtonFlg = (!question || !greeting);
    this.messageStr = greeting + ' ' + question;
  }
  inputValueChanged(message: string) {
    if (message == '[submitText]') {
      this.sendMessage();
      return;
    }
    this.messageStr = message;
    this.disabledButtonFlg = (this.messageStr.length == 0);
  }
  selectMessage(num: number) {
    if (num == this.selectedMessage)
      this.selectedMessage = 0;
    else
      this.selectedMessage = num;
  }
  deleteCurrentText() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      messageId: this.selectedMessage,
      action: "deleteMessage"
    };
    this.executeApi('betraMessages.php', params, true);
  }
}
