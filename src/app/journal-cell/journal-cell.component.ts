import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';

declare var $: any;
declare var getVersion: any;

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss']
})
export class JournalCellComponent extends BaseComponent implements OnInit {
  @Input('journal') journal: any = null;
  @Input('index') index: number = 0;
  @Input('postId') postId: number = 0;
  @Input('adminFlg') adminFlg: boolean = false;
  @Input('userId') override userId: number = 0;
  @Input('imgSrc') override imgSrc: string = '';
  @Input('level') level: number = 0;

  @Output() messageEvent = new EventEmitter<any>();

  public replyToFlg: boolean = false;
  public showOptionsFlg: boolean = false;
  public strLength: number = 0;
  public replies: any = [];
  public showRepliesFlg: boolean = false;
  public showConfirmationFlg: boolean = false;
  public showAttachmentFlg: boolean = false;
  public adminAction: string = '';
  public bugImgSrc: any = null;
  public showImageFlg: boolean = false;
  public appVersion:string = getVersion();

  constructor() { super(); }

  override ngOnInit(): void {
    this.level++;
  }

  ngClassPic(num: number) {
    if (num > 0)
      return 'profile-circle-small';
    else
      return 'profile-circle';
  }
  replyTo(journal: any) {
    this.messageEvent.emit(journal);
  }

  menuOptionPressed(action: string) {
    this.showOptionsFlg = false;
    this.adminAction = action;
    if (action == 'flag' || action == 'delete')
      this.showConfirmationFlg = true;
  }

  optionConfirmPressed() {
    this.showConfirmationFlg = false;
    this.journalApiCall(this.adminAction + 'Journal');
  }

  submitButtonPressed() {
    this.adminAction = '';
    this.journal.message = $('#journalEditText').val();
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      message: $('#journalEditText').val(),
      action: "postJournal",
      version: this.appVersion,
      edit_id: this.journal.row_id
    };
    console.log(params);
    this.executeApi('journal.php', params, true);
  }

  journalApiCall(action: string) {
    if(action == 'likePost') {
      this.journal.iLikeFlg = true;
      this.journal.iDislikeFlg = false;
    }
    if(action == 'dislikePost') {
      this.journal.iLikeFlg = false;
      this.journal.iDislikeFlg = true;      
    }
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      postId: this.journal.row_id,
      version: this.appVersion,
      action: action
    };
    console.log('params', params);
    this.executeApi('journal.php', params, true);
  }

  toggleReplies() {
    this.showRepliesFlg = !this.showRepliesFlg;
    if (this.showRepliesFlg)
      this.journalApiCall('refreshPost');
    else {
      this.replies = [];
    }
  }

  toggleReply() {
    this.replyToFlg = !this.replyToFlg;
    if (this.replyToFlg) {
      setTimeout(() => {
        $('#replyInputText').focus();
      }, 200);

    }
  }

  toggleAttachment() {
    this.showAttachmentFlg = !this.showAttachmentFlg;
  }

  updateImageButtonClicked() {
    this.showAttachmentFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: 'updateBugImage',
      bugId: this.journal.row_id,
      image: $('#myImg').attr('src')
    };
    console.log('updateImageButtonClicked', params);
    this.executeApi('appApiCode.php', params, true);
  }

  sumbitReply() {
    var message = $('#replyInputText').val();
    if (message.length > 0) {
      this.replyToFlg = false;
      var postId = this.journal.postId;
      if (postId == 0)
        postId = this.journal.row_id;
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        postId: postId,
        replyTo: this.journal.row_id,
        actionFlg: 'Y',
        message: message,
        action: "postJournal"
      };
      console.log('params', params, this.journal);
      this.executeApi('journal.php', params, true);
    }
  }

  getAllReviews() {

  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'flagJournal') {
      this.errorMessage = 'This post has been flagged. Thankyou.';
    }
    if (responseJson.action == 'deleteJournal') {
      this.errorMessage = 'This post has been deleted.';
      this.journal = null;
    }
    if (responseJson.action == 'likePost') {
      this.journal.likes++;
    }
    if (responseJson.action == 'dislikePost') {
      this.journal.dislikes++;
    }
    if (responseJson.action == 'markAsFixed' || responseJson.action == 'markAsBackBurner' || responseJson.action == 'markAsClosed') {
      this.messageEvent.emit('refresh');
    }
    if (responseJson.action == 'refreshPost') {
      this.journal = new Journal(responseJson.mainPost, this.userId);
      var replies: any = [];
      if(responseJson.itemArray) {
        responseJson.itemArray.forEach((element: any) => {
          replies.push(new Journal(element, this.userId));
        });
      }
      this.replies = replies;
    }

  }

  inputValueChanged(event: any) {
    var e = (document.getElementById('replyInput') as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      value = value.replace(/`/g, '');
      this.strLength = value.length;
      e.value = value;
    }
  }

}
