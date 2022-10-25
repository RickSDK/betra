import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  public playerlist: any = [];
  public toggle: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    this.loadUserObj();
    this.loadPlayers();
  }
  loadPlayers() {
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      action: 'getPlayers'
    };
    this.executeApi('appApiCode.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.playerlist = [];
    responseJson.playerList.forEach((element: any) => {
      var player = new User(element);
      this.playerlist.push(player);
    });
    console.log('xxx playerlist', this.playerlist);
  }

}
