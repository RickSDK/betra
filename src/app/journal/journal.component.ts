import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent extends BaseComponent implements OnInit {
  public journalList: any = [];
  public showFormFlg: boolean = false;
  public selectedJournal: any = null;
  public postId: number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAllReviews();
  }
  getAllReviews() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getJournals"
    };
    console.log(params);
    this.executeApi('betraReviews.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getJournals' || responseJson.action == 'postJournalReply') {
      this.selectedJournal = null;
      this.journalList = responseJson.itemArray;
      this.journalList.forEach((element: any) => {
        element.src = this.betraImageFromId(element.user_id, element.profilePic);
        element.localDt = this.localDateFrommySqlDate(element.created);
      });
    }
  }
  submitButtonPressed() {
    this.showFormFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      message: $('#journalText').val(),
      firstName: this.user.firstName,
      profilePic: this.user.profilePic,
      action: "postJournal"
    };
    console.log(params);
    this.executeApi('betraReviews.php', params, true);
  }
  replyButtonPressed() {
    this.showFormFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      message: $('#journalText').val(),
      firstName: this.user.firstName,
      profilePic: this.user.profilePic,
      postId: this.postId,
      replyTo: this.postId,
      action: "postJournal"
    };
    console.log('replyButtonPressed', params);
    this.executeApi('betraReviews.php', params, true);
  }
  createNewEntry() {
    this.postId = 0;
    this.showFormFlg = true;
    this.selectedJournal = null;
    this.journalList = [];
  }
  cancelButtonPressed() {
    this.showFormFlg = false;
    this.selectedJournal = null;
    if (this.postId > 0 || this.journalList.length == 0) {
      this.postId = 0;
      this.getAllReviews();
    }
  }
  replyButtonClicked(journal: any) {
    console.log('made it', journal);
    this.postId = journal.row_id;
    this.selectedJournal = journal;
    this.showFormFlg = true;
    if (journal.replies > 0) {
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        postId: this.postId,
        action: "getJournals"
      };
      console.log(params);
      this.executeApi('betraReviews.php', params, true);
    }
  }
}
