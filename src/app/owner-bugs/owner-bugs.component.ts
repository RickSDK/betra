import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

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
  public displayedBugs: any = [];
  public allBugs: any = [];
  public appVersion: string = '';
  public statusOptions = ['New', 'Back Burner', 'Fixed'];
  public displayStatus = 'New';
  public region: string = 'Bug';
  public pageTitle: string = 'Bugs';

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.displayedBugs = [];
    this.route.queryParams.subscribe(params => {
      var id = params['id'] || 0;
      if (id == 2) {
        this.region = 'Discus';
        this.pageTitle = 'Discussion';
      }
      if (id == 3) {
        this.region = 'Bug';
        this.pageTitle = 'Bugs';
      }
      this.statusOptions = ['New', 'Back Burner', 'Fixed'];
      if (this.region == 'Discus')
        this.statusOptions = ['New', 'Closed'];

      this.getAllEntries();
    });

    this.appVersion = getVersion();
  }

  changeStatusFilter(num: number) {
    this.menuNum = num;
    this.displayStatus = this.statusOptions[num];
    this.filterBugs();
  }

  filterBugs() {
    var filteredBugs: any = [];
    this.displayedBugs = [];
    this.allBugs.forEach((element: any) => {
      if (element.status == this.displayStatus)
        filteredBugs.push(element);
    });
    this.displayedBugs = filteredBugs;
  }

  getAllEntries() {
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
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getJournals' || responseJson.action == 'postJournalReply') {
      this.selectedJournal = null;
      this.allBugs = [];
      var allBugs: any = [];
      responseJson.itemArray.forEach((element: any) => {
        allBugs.push(new Journal(element, this.userId));
      });
      this.allBugs = allBugs;
      this.filterBugs();
    }
  }
  submitButtonPressed() {
    this.showFormFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      message: $('#journalText').val(),
      region: this.region,
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
    this.displayedBugs = [];
  }
  cancelButtonPressed() {
    this.showFormFlg = false;
    this.selectedJournal = null;
    if (this.postId > 0 || this.displayedBugs.length == 0) {
      this.postId = 0;
      this.getAllEntries();
    }
  }
  replyButtonClicked(journal: any) {
    console.log('made it', journal);
    this.postId = journal.row_id;
    this.selectedJournal = journal;
    this.showFormFlg = true;
    this.getAllEntries();
    /*
    if (journal.replies > 0) {
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        postId: this.postId,
        action: "getJournals"
      };
      console.log(params);
      this.executeApi('journal.php', params, true);
    }*/
  }
}
