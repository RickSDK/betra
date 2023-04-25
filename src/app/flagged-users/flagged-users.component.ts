import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-flagged-users',
  templateUrl: './flagged-users.component.html',
  styleUrls: ['./flagged-users.component.scss']
})
export class FlaggedUsersComponent extends BaseComponent implements OnInit {
  public playerList: any = [];
  public itemList: any = [];
  public reviewObj: any = null;
  public headlines: any = [
    'Approve Profile Pic', 'Flagged Users', 'Flagged Reviews', 'New Reviews', 'Flagged Journals', 'Verify Pic'
  ];
  public headline = '';

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.menuNum = parseInt(params['id']) || 0;
      this.headline = this.headlines[this.menuNum];
      if (this.menuNum == 1)
        this.getDataFromServer('getFlaggedUsers', 'owners.php', []);
      if (this.menuNum == 2)
        this.getDataFromServer('getFlaggedReview', 'betraReviews.php', []);
      if (this.menuNum == 3)
        this.getDataFromServer('getNewReview', 'betraReviews.php', []);
      if (this.menuNum == 4)
        this.getDataFromServer('getFlaggedJournal', 'journal.php', []);
    });



  }

  reviewReviewed(action: string) {
    this.errorMessage = 'Not coded yet';
  }

  buttonPressed(player: any, action: string) {
    this.playerList = [];
    var params = { uid: player.user_id };
    this.getDataFromServer(action, 'owners.php', params);
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getFlaggedUsers') {
      this.playerList = [];
      responseJson.playerList.forEach((element: any) => {
        this.playerList.push(new User(element));
      });
    }
    if (responseJson.action == 'getNewReview' || responseJson.action == 'getFlaggedJournal') {
      this.reviewObj = responseJson.reviewObj;
    }
  }
}
