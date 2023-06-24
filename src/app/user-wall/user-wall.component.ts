import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-user-wall',
  templateUrl: './user-wall.component.html',
  styleUrls: ['./user-wall.component.scss']
})
export class UserWallComponent extends BaseComponent implements OnInit {
  public messages:any = [];
  public override user: any;
  public myUser: any;
  public writeMessageFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }

  loadMessages(myUser: User, user: User) {
    this.user = user;
    this.myUser = myUser;
    this.getDataFromServer('readMessages', 'wall.php', {uid: this.user.user_id});
  }

  sumbitChat(message: string) {
    console.log(this.user, this.myUser);
    this.getDataFromServer('postMessage', 'wall.php', {uid: this.user.user_id, message: message});
  }

  deleteMessage(message: any) {
    console.log(message.row_id);
    this.getDataFromServer('deleteMessage', 'wall.php', {row_id: message.row_id});
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if(responseJson.action != 'logUser') {
      this.messages = responseJson.messages;
    }
  }
}
