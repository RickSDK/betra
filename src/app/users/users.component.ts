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
  public menuButtons = ['Active', 'Pending', 'Started', 'Deleted'];
  public sortedlist: any = [];
  public selectedId: number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    this.loadUserObj();
    this.loadPlayers();
  }
  changeMenu(num: number) {
    this.menuNum = num;
    this.sortList();
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
  deleteUser(player: any) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: player.user_id,
      action: 'deleteUser'
    };
    console.log(params);
    this.executeApi('owners.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getPlayers') {
      this.playerlist = [];
      responseJson.playerList.forEach((element: any) => {
        var player = new User(element);
        this.playerlist.push(player);
      });
      this.sortList();
      console.log('xxx playerlist', this.playerlist);
    }
    if (responseJson.action == 'deleteUser') {
      this.loadPlayers();
    }

  }
  sortList() {
    var sortedlist: any = [];
    this.playerlist.forEach((element: any) => {
      if (this.menuNum == 0 && element.status == 'Active')
        sortedlist.push(element);

      if (this.menuNum == 1 && element.status == 'Pending')
        sortedlist.push(element);

      if (this.menuNum == 2 && element.status == 'Started')
        sortedlist.push(element);

      if (this.menuNum == 3 && element.status == 'Deleted')
        sortedlist.push(element);
    });
    this.sortedlist = sortedlist;
  }

}
