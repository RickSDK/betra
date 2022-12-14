import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';

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
  public region: string = 'main';

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAllJournals();
  }
  getAllJournals() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      region: this.region,
      action: "getJournals"
    };
    console.log(params);
    this.executeApi('journal.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getJournals' || responseJson.action == 'postMainJournal' || responseJson.action == 'postJournalReply') {
      this.selectedJournal = null;
      this.journalList = [];
      var journalList: any = [];
      responseJson.itemArray.forEach((element: any) => {
        if (element.status != 'Closed')
          journalList.push(new Journal(element));
      });
      this.journalList = journalList;
    }
  }
  submitButtonPressed() {
    this.errorMessage = '';
    if ($('#aboutme').val() == "" || $('#history').val() == "" || $('#lookingFor').val() == "") {
      this.errorMessage = 'Fill out all required fields';
      return;
    }
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      region: this.region,
      message: $('#aboutme').val(),
      history: $('#history').val(),
      lookingFor: $('#lookingFor').val(),
      action: "postMainJournal"
    };
    //console.log(params);
    this.showFormFlg = false;
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
      this.getAllJournals();
    }
  }
  replyButtonClicked(journal: any) {
    this.getAllJournals();
  }
}
