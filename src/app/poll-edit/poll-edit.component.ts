import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.scss']
})
export class PollEditComponent extends BaseComponent implements OnInit {
  public pollTitle: string = '';
  public polls: any = [];
  public selectedPoll: any = null;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getAllPolls', 'polls.php', {});
  }

  textValueSubmitted(event: any) {
    console.log(event);
    this.pollTitle = '';
    this.getDataFromServer('createPoll', 'polls.php', { name: event });
  }

  answerSubmitted(event: any) {
    console.log(event);
    this.pollTitle = '';
    this.getDataFromServer('answerSubmitted', 'polls.php', { poll_id: this.selectedPoll.poll_id, name: event });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getAllPolls') {
      this.polls = responseJson.polls;
    }
  }
}
