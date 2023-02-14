import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

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
  public datingPoolLimit: number = 8;
  public datingPoolSize: number = 8;
  public displayPicsSize: number = 8;
  public panRight: boolean = false;
  public exceededPoolSizeFlg: boolean = false;
  public showIntimacyLevelsFlg: boolean = false;
  public showIntimacyValuesFlg: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    var showIntimacyLevelsFlg = localStorage['showIntimacyLevelsFlg'];
    this.showIntimacyLevelsFlg = showIntimacyLevelsFlg && showIntimacyLevelsFlg == 'Y';
    this.showIntimacyValuesFlg = this.showIntimacyLevelsFlg; // messes up toggle switch otherwise
    this.datingPoolLimit = (this.user.memberFlg) ? 12 : 8;

    this.datingPoolSize = this.user.datingPool.length;
    this.exceededPoolSizeFlg = this.user.datingPool.length > this.datingPoolLimit;
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
      this.datingPool.push(this.user.datingPool[i])
    }
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  toggleIntimacyFlg() {
    this.showIntimacyValuesFlg = !this.showIntimacyValuesFlg;
    var showIntimacyLevelsFlg = localStorage['showIntimacyLevelsFlg'];
    localStorage['showIntimacyLevelsFlg'] = (showIntimacyLevelsFlg && showIntimacyLevelsFlg == 'Y') ? 'N' : 'Y';
  }

  dropPersonFromDP(person: any) {
    var datingPool: any = [];
    this.datingPool.forEach((element: any) => {
      if (element.user_id != person.user_id)
        datingPool.push(element);
    });
    this.datingPool = datingPool;
    this.exceededPoolSizeFlg = this.datingPool.length > this.datingPoolLimit;

    var params = {
      matchId: person.user_id,
    };
    this.getDataFromServer('removeThisUser', 'appApiCode2.php', params);

  }

  userClicked(person: any) {
    this.messageEvent.emit(person.user_id.toString());
  }

}
