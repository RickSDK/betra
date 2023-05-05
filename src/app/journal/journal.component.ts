import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

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
  public journalId: number = 0;
  public page: any = null;

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.journalId = parseInt(params['id']) || 0;

      this.getDataFromServer('getJournals', 'journal2.php', { region: this.region, journalId: this.journalId });
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getJournals' || responseJson.action == 'postMainJournal' || responseJson.action == 'postJournalReply') {
      this.page = responseJson;
      this.showFormFlg = false;
      this.selectedJournal = null;
      this.journalList = [];
      var journalList: any = [];
      responseJson.itemArray.forEach((element: any) => {
        if (element.status != 'Closed')
          journalList.push(new Journal(element, this.user.user_id));
      });
      this.journalList = journalList;
      //     console.log('hey!!', journalList);

    }
  }
  submitButtonPressed() {
    this.errorMessage = '';
    var message = $('#message').val()
    if (message == "") {
      this.errorMessage = 'Fill out all the text area.';
      return;
    }
    this.getDataFromServer('postMainJournal', 'journal2.php', { message: message });
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
    this.executeApi('journal2.php', params, true);
  }
  createNewEntry() {
    this.postId = 0;
    this.showFormFlg = true;
    this.selectedJournal = null;
    this.journalList = [];
  }
  loadAllJournals() {
    this.showFormFlg = false;
    this.getDataFromServer('getJournals', 'journal2.php', { region: this.region });
  }

  replyButtonClicked(journal: any) {
    this.getDataFromServer('getJournals', 'journal2.php', { region: this.region, journalId: this.journalId });

  }
}
