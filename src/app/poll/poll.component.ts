import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent extends BaseComponent implements OnInit {
  public polls: any = [];
  public betraPolls: any = [];
  public userPolls: any = [];
  public selectedPoll: any = null;
  public pollResponses: any = null;
  public noVotesYet: boolean = true;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.menuNum = 1;
    this.getDataFromServer('getAllPolls', 'polls.php', {});
  }
  selectPoll(poll: any, num: number) {
    poll.selected = true;
    poll.selectedNum = num;
  }
  voteForItem(poll: any) {
    poll.selected = false;
    this.getDataFromServer('registerVote', 'polls.php', { poll_id: poll.poll_id, num: poll.selectedNum });
  }
  showResultsOfPoll(poll: any) {
    this.selectedPoll = poll;
    this.getDataFromServer('getPollResponses', 'polls.php', { poll_id: poll.poll_id });
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getAllPolls') {
      this.betraPolls = responseJson.polls;
      this.userPolls = responseJson.userPolls;
      this.loadPolls(this.menuNum);
    }
  }

  deletePoll(poll:any) {
    this.getDataFromServer('deletePoll', 'polls.php', { poll_id: poll.poll_id });
  }

  loadPolls(num: number) {
    this.menuNum = num;
    this.polls = [];

    if (num == 1)
      this.polls = this.betraPolls;
    else
      this.polls = this.userPolls;

    this.polls.forEach((element: any) => {
      if (element.iVoted)
        this.noVotesYet = false;

    });

  }
}
