import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  public playerlist: any = [];
  public toggle: boolean = false;
  public menuButtons = ['Last 50', 'Last 100', 'Online Today'];
  public sortedlist: any = [];
  public selectedId: number = 0;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    this.loadUserObj();
    this.loadPlayers();
  }
  changeMenu(num: number) {
    this.menuNum = num;
    this.sortedlist = [];
    this.getDataFromServer('getPlayers', 'appApiCode.php', { menuNum: this.menuNum });
    //this.sortList();
  }

  ngStyle(status: string) {
    if (status == 'Deleted')
      return { 'background-color': 'red' };
    if (status == 'Active')
      return { 'background-color': '#cfc' };
    if (status == 'Pending')
      return { 'background-color': 'yellow' };

    return { 'background-color': 'white' };
  }

  loadPlayers() {
    var params = {
      userId: localStorage['user_id'],
      email: localStorage['email'],
      code: localStorage['code'],
      action: 'getPlayers',
      menuNum: this.menuNum
    };
    this.executeApi('appApiCode.php', params, true);
  }
  deleteUser(player: any) {
    this.sortedlist = [];
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
    console.log('xxx', responseJson);
    if (responseJson.action == 'getPlayers') {
      this.sortedlist = [];
      responseJson.playerList.forEach((element: any) => {
        var player = new User(element);
        this.sortedlist.push(player);
      });
      console.log('xxx playerlist', this.sortedlist);
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
