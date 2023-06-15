import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-journal-cell2',
  templateUrl: './journal-cell2.component.html',
  styleUrls: ['./journal-cell2.component.scss']
})
export class JournalCell2Component extends BaseComponent implements OnInit {
  @Input('journal') journal: Journal | undefined;
  @Input('userId') override userId: number = 0;
  @Input('profilePic') profilePic: number = 0;


  public showOptionsFlg: boolean = false;
  public adminAction: string = '';
  public showConfirmationFlg: boolean = false;
  public showUpdatesFlg: boolean = false;
  public journalItem: Journal | undefined;
  public replyToFlg: boolean = false;
  public showCommentsFlg: boolean = false;
  public commentPostedFlg: boolean = false;



  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    this.journalItem = new Journal(this.journal, this.userId);
    console.log('xxx', this.journalItem);
  }

  menuOptionPressed(action: string) {
    this.showOptionsFlg = false;
    this.adminAction = action;
    if (action == 'flag' || action == 'delete')
      this.showConfirmationFlg = true;
  }
  optionConfirmPressed() {
    this.showConfirmationFlg = false;
    this.getDataFromServer('deleteJournal', 'journal2.php', { journalId: this.journal?.row_id });
  }

  likePost(item: any) {
    item.likes++;
    item.iLikeFlg = true;
    item.iDislikeFlg = false;
    this.getDataFromServer('likePost', 'journal2.php', { journalId: item?.row_id });

  }
  dislikePost(item: any) {
    item.dislikes++;
    item.iDislikeFlg = true;
    item.iLikeFlg = false;
    this.getDataFromServer('dislikePost', 'journal2.php', { journalId: item?.row_id });

  }

  submitButtonPressed() {
    var message = $('#journalEditText').val()
    this.getDataFromServer('editMessage', 'journal2.php', { message: message, journalId: this.journal?.row_id });
    this.adminAction = '';
    console.log('hey!', this.journal?.row_id);
  }

  sumbitReply(message: string) {
    this.replyToFlg = false;
    this.showCommentsFlg = true;
    this.commentPostedFlg = true;
    this.journalItem?.comments.push({ user_id: this.userId, profilePic: this.profilePic, message: message });
    this.getDataFromServer('postMessage', 'journal2.php', { message: message, journalId: this.journal?.row_id });
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    //this.addEntryFlg = false;
    if (responseJson.action == 'getJournals') {
      if (responseJson.itemArray.length > 0)
        this.journal = new Journal(responseJson.itemArray[0]);
    }
    if (responseJson.action == 'flagJournal') {
      this.errorMessage = 'This post has been flagged. Thankyou.';
    }
    if (responseJson.action == 'deleteJournal') {
      this.errorMessage = 'This post has been deleted.';
      this.journalItem = undefined;
    }
    if (responseJson.action == 'likePost') {
      if (this.journal)
        this.journal.likes++;
    }
    if (responseJson.action == 'dislikePost') {
      if (this.journal)
        this.journal.dislikes++;
    }
    if (responseJson.action == 'refreshPost') {
      this.journal = new Journal(responseJson.mainPost, this.userId);
      var replies: any = [];
      if (responseJson.itemArray) {
        responseJson.itemArray.forEach((element: any) => {
          replies.push(new Journal(element, this.userId));
        });
      }
      //this.replies = replies;
    }
  }
}
