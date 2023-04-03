import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent extends BaseComponent implements OnInit {
  public isIncluded: boolean = false;
  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getContestUsers', 'contest.php', {});
  }
  signUp() {
    this.getDataFromServer('signUp', 'contest.php', {});
  }
  removeMe() {
    this.getDataFromServer('removeMe', 'contest.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "getContestUsers") {
      this.isIncluded = responseJson.isIncluded;
    }
  }
}
