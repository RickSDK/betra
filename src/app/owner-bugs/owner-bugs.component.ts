import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';

declare var $: any;
declare var getVersion: any;

@Component({
  selector: 'app-owner-bugs',
  templateUrl: './owner-bugs.component.html',
  styleUrls: ['./owner-bugs.component.scss']
})
export class OwnerBugsComponent extends BaseComponent implements OnInit {
  public postId: number = 0;
  public selectedJournal: any;
  public showFormFlg: boolean = false;
  public journalList:any = [];
  public appVersion:string = '';

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAllBugs();
    this.appVersion = getVersion();
  }

  getAllBugs() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      region: 'Bug',
      action: "getJournals"
    };
    console.log(params);
    this.executeApi('journal.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getJournals' || responseJson.action == 'postJournalReply') {
      this.selectedJournal = null;
      this.journalList = [];
      var journalList: any = [];
      responseJson.itemArray.forEach((element: any) => {
        journalList.push(new Journal(element));
      });
      this.journalList = journalList;
    }
  }
  submitButtonPressed() {
    this.showFormFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      message: $('#journalText').val(),
      region: 'Bug',
      bugType: $('#bugType').val(),
      deviceType: $('#deviceType').val(),
      version: this.appVersion,
      action: "postJournal"
    };
    console.log(params);
    this.executeApi('journal.php', params, true);
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
    this.executeApi('journal.php', params, true);
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
      this.getAllBugs();
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
      this.executeApi('journal.php', params, true);
    }
  }
}
