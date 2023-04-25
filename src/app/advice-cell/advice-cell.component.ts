import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-advice-cell',
  templateUrl: './advice-cell.component.html',
  styleUrls: ['./advice-cell.component.scss']
})
export class AdviceCellComponent extends BaseComponent implements OnInit {
  @Input('person') person: any = null;
  @Input('admin') admin: any = null;
  public showReplyFlg: boolean = false;
  public showAdviceFlg: boolean = false;
  public advicePostedFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }
  deleteMessage(message: any) {
    var messages: any = [];
    this.person.messages.forEach((element: any) => {
      if (element.row_id != message.row_id)
        messages.push(element);
    });
    this.person.messages = messages;
    this.getDataFromServer('deleteMessage', 'advice.php', { row_id: message.row_id });
  }

  submitAdvice(message: string, online_tips: string, dating_tips: string) {
    //var online_tips = document.getElementById('online_tips').value;
    console.log(message, online_tips, dating_tips);
    if(!message || !online_tips || !dating_tips) {
      this.errorMessage = 'Fill out form completely';
      return;
    }
    this.getDataFromServer('addAdviceMessage', 'advice.php', { message: message, online_tips: online_tips, dating_tips: dating_tips, uid: this.person.user_id });
    this.showAdviceFlg = false;
    this.advicePostedFlg = true;
  }

  sumbitReply(event: any) {
    this.person.messages.push({ row_id: 0, message: event, user_id: this.admin.user_id, profilePic: this.admin.profilePic });
    this.getDataFromServer('addMessage', 'advice.php', { message: event, uid: this.person.user_id });
    this.showReplyFlg = false;
  }
}
