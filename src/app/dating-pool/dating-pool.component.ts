import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-dating-pool',
  templateUrl: './dating-pool.component.html',
  styleUrls: ['./dating-pool.component.scss']
})
export class DatingPoolComponent extends BaseComponent implements OnInit {
  @Input('user') override user: any = null;
  @Input('largeFlg') largeFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public datingPool: any = [];
  public datingPoolSize: number = 8;
  public displayPicsSize: number = 8;
  public panRight: boolean = false;
  public exceededPoolSizeFlg: boolean = false;
  public showIntimacyLevelsFlg: boolean = false;
  public showIntimacyValuesFlg: boolean = false;
  public showDeleteButtonsFlg: boolean = false;
  public toggleDeleteButtonsFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    if (!this.user)
      return;
    var showIntimacyLevelsFlg = localStorage['showIntimacyLevelsFlg'];
    this.showIntimacyLevelsFlg = showIntimacyLevelsFlg && showIntimacyLevelsFlg == 'Y';
    this.showIntimacyValuesFlg = this.showIntimacyLevelsFlg; // messes up toggle switch otherwise

    this.datingPoolSize = this.user.datingPool.length;
    var width = window.innerWidth;
    if (width > 812)
      width -= 400;
    else if (width > 615)
      width -= 200;

    this.displayPicsSize = Math.round(width / 50);
    if (this.displayPicsSize > this.user.datingPool.length)
      this.displayPicsSize = this.user.datingPool.length;

    if (this.largeFlg)
      this.displayPicsSize = this.user.datingPool.length;

    this.refreshDatingPool();

  }

  panRightClicked(flag: boolean) {
    this.panRight = flag;
    if (flag) {
      this.datingPool = [];
      for (var i = this.datingPoolSize - this.displayPicsSize; i < this.datingPoolSize; i++) {
        this.datingPool.push(this.user.datingPool[i])
      }
    } else
      this.refreshDatingPool();
  }

  refreshDatingPool() {
    this.datingPool = [];
    for (var i = 0; i < this.displayPicsSize; i++) {
      var dpItem = this.user.datingPool[i];
      if (dpItem.match) {
        dpItem.newGifts = dpItem.match.newGifts
        if (dpItem.match.newMatchFlg == 'Y')
          dpItem.lastLoginText = 'New Match!';
        if (dpItem.match.you_date_request == 'Y')
          dpItem.lastLoginText = 'Date Requested!';
        if (dpItem.match.you_date_request == 'M')
          dpItem.lastLoginText = 'Date Modified!';
        if (dpItem.match.match_date_request == 'A' || dpItem.match.you_date_request == 'A')
          dpItem.lastLoginText = 'Scheduled Date';
        if (dpItem.match.match_info_request == 'Y')
          dpItem.lastLoginText = 'Info Requested!';
        if (dpItem.match.roseAssignedBy > 0)
          dpItem.lastLoginText = 'Rose Assigned!';
        if (dpItem.match.unreadMessages > 0)
          dpItem.lastLoginText = 'New Messages!';
      }
      this.datingPool.push(dpItem)
    }
    if (this.datingPool.length != this.user.datingPool.length) {
      console.log('DP: out of sync!');
    }
    //console.log('+++dp', this.user.datingPool);
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  toggleIntimacyFlg() {
    this.showIntimacyValuesFlg = !this.showIntimacyValuesFlg;
    var showIntimacyLevelsFlg = localStorage['showIntimacyLevelsFlg'];
    localStorage['showIntimacyLevelsFlg'] = (showIntimacyLevelsFlg && showIntimacyLevelsFlg == 'Y') ? 'N' : 'Y';
  }

  toggleRemoveUsers() {
    this.toggleDeleteButtonsFlg = !this.toggleDeleteButtonsFlg;
  }

  dropPersonFromDP(person: any) {
    var datingPool: any = [];
    this.datingPool.forEach((element: any) => {
      if (element.user_id != person.user_id)
        datingPool.push(element);
    });
    this.datingPool = datingPool;
    this.exceededPoolSizeFlg = this.datingPool.length > this.user.datingPoolLimit;

    var params = {
      matchId: person.user_id,
    };
    this.getDataFromServer('removeThisUser', 'appApiCode2.php', params);

  }

  userClicked(person: any) {
    this.messageEvent.emit(person.user_id.toString());
  }

}
