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

    this.refreshDatingPool();
    this.exceededPoolSizeFlg = this.user.datingPool.length > this.datingPoolLimit;
  }

  refreshDatingPool() {
    this.datingPool = this.user.datingPool;
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
