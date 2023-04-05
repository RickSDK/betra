import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() messageEvent = new EventEmitter<string>();

  public showDetailsFlg: boolean = false;
  public showTextInputFlg = false;
  public selectedMessage: number = 0;
  public firstName: string = '';
  public unreadMessagesFlg: boolean = false;
  public showDetailsNumber: number = 0;
  public messageToDelete: number = 0;
  public displayThisComponentFlg: boolean = false;

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
    'How are you?',
    'What is your favorite animal?',
    'How is the dating world?',
    'What is the last movie you saw?',
    'What is your favorite sports team?',
    'What is your favorite restaurant?',
    'What do you like to do for fun?',
    'Who is your favorite actor/actress?',
    'What is your favorite movie of all time?',
    'What is your favorite superhero?',
    'What is your favorite breed of dog?',
    'What do you think of Betra?',
    'What is your favorite TV show?'
  ];
  public messageSentFlg: boolean = false;
  public disabledButtonFlg: boolean = true;
  public messages: any = [];
  public messageStr: string = '';
  public emojis = [
    'assets/images/emojis/trash.png',
    'assets/images/emojis/thumbsUp.png',
    'assets/images/emojis/surprised.png',
    'assets/images/emojis/sad.png',
    'assets/images/emojis/ok.png',
    'assets/images/emojis/laugh.png',
    'assets/images/emojis/hmm.png',
    'assets/images/emojis/flip.png',
    'assets/images/emojis/annoyed.png',
    'assets/images/emojis/angry.png',
    'assets/images/emojis/angry2.png',
  ];
  public emojisIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

  public emojiBatch = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    //super.ngOnInit();
    this.populateModal(this.matchUser);
    this.displayThisComponentFlg = this.matchUser && this.matchUser.matchObj && this.matchUser.matchObj.match_level > 1;
  }

  emojiSrcForId(id: string) {
    return 'assets/images/emojis/emoji' + (parseInt(id) + this.emojiBatch * 8) + '.png';
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  populateModal(matchUser: any) {
    console.log('populate modal');
    this.messageSentFlg = false;
    this.messages = [];
    this.matchUser = matchUser;

    this.firstName = this.matchUser.firstName;

    if (this.matchUser && this.matchUser.matchObj) {
      this.checkTextFlags();

      this.loadMessages();
    }
  }

  toggleShowDetailsNumber(num: number) {
    if (num == this.showDetailsNumber)
      this.showDetailsNumber = 0;
    else
      this.showDetailsNumber = num;
  }

  checkTextFlags() {
    this.showTextInputFlg = false;
    if (this.matchUser.matchObj.match_level == 3 && this.matchUser.matchObj.you_action == 'Interested')
      this.showTextInputFlg = true;
    if (this.matchUser.matchObj.match_level == 3 && this.matchUser.matchObj.you_action == 'message sent' && this.matchUser.matchObj.match_action == 'message sent')
      this.showTextInputFlg = true; // out of sync situation
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
        //console.log('xxx', message.created, dt);
        if (!message.readDt)
          showDetailsFlg = true;
        if (message.uid == this.myUser.user_id && !message.readDt)
          this.unreadMessagesFlg = true;
        message.name = (message.user_id == this.myUser.user_id) ? this.myUser.firstName : this.matchUser.firstName;
        message.local = dt.local;
        this.messages.push(message);
      });
      if (this.messages.length > 0)
        this.displayThisComponentFlg = true;
      this.showDetailsFlg = showDetailsFlg;
      if (this.messages.length <= 2)
        this.showDetailsFlg = true;

      this.messages.sort((a: any, b: any) => {
        return a.id - b.id;
      });

      if (responseJson.refreshFlg == 'Y') {
        this.messageEvent.emit('refresh');
      }

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
      return 'pull-right';
    else
      return 'pull-left';
  }
  ngClassMessageBlob(user_id: number) {
    if (user_id == this.myUser.user_id)
      return 'blue-blob';
    else
      return 'gray-blob';
  }
  questionValueChanged() {
    var greeting = $('#greetingText').val();
    var question = $('#questionText').val();
    this.disabledButtonFlg = (!greeting);
    this.messageStr = greeting;
    if (question)
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
  deleteCurrentText(message: any) {
    this.messageToDelete = 0;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      messageId: message.id,
      action: "deleteMessage"
    };
    this.executeApi('betraMessages.php', params, true);
  }

  emojiClicked(message: any, emoji: number) {
    if (emoji == 0)
      this.messageToDelete = message.id;
    else {
      this.selectedMessage = 0;
      emoji += this.emojiBatch * 8;
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        uid: this.matchUser.user_id,
        messageId: message.id,
        emoji: emoji,
        action: "addEmoji"
      };
      console.log('params', params);
      this.executeApi('betraMessages.php', params, true);
    }
  }
}
