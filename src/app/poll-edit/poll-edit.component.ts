import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.scss']
})
export class PollEditComponent extends BaseComponent implements OnInit {
  public pollTitle: string = '';
  public polls: any = [];
  public selectedPoll: any = null;
  public pollPublished: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getEveryPoll', 'polls.php', {});
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

  deleteQuestion(question: any) {
    console.log(question, this.selectedPoll);
    this.getDataFromServer('deleteQuestion', 'polls.php', { num: question.number, poll_id: this.selectedPoll.poll_id });
  }

  publishPoll() {
    this.getDataFromServer('publishPoll', 'polls.php', { poll_id: this.selectedPoll.poll_id });
    this.pollPublished = true;
    this.selectedPoll = null;
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'getEveryPoll') {
      this.polls = responseJson.polls;
      if (this.selectedPoll) {
        this.polls.forEach((element: any) => {
          if (element.poll_id == this.selectedPoll.poll_id)
            this.selectedPoll = element;
          this.pollTitle = '';

        });
      }
    }
  }
}
