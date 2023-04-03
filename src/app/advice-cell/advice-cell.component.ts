import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-advice-cell',
  templateUrl: './advice-cell.component.html',
  styleUrls: ['./advice-cell.component.scss']
})
export class AdviceCellComponent extends BaseComponent implements OnInit {
  @Input('person') person: any = null;
  @Input('admin') admin: any = null;
  public showReplyFlg: boolean = false;

  constructor() { super(); }

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

  sumbitReply(event: any) {
    this.person.messages.push({row_id: 0, message: event, user_id: this.admin.user_id, profilePic: this.admin.profilePic});
    this.getDataFromServer('addMessage', 'advice.php', { message: event, uid: this.person.user_id });
    this.showReplyFlg = false;
  }
}
