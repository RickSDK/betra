import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-dating-pool',
  templateUrl: './match-dating-pool.component.html',
  styleUrls: ['./match-dating-pool.component.scss']
})
export class MatchDatingPoolComponent implements OnInit {
  @Input('datingPool') datingPool: any = [];
  @Input('firstName') firstName: string = '';
  @Input('uid') uid: string = '';

  public datingPoolList: any = [];
  public showIntimacyLevelsFlg: boolean = false;
  public showIntimacyLevelFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    var showIntimacyLevelsFlg = localStorage['showIntimacyLevelsFlg'];
    this.showIntimacyLevelsFlg = showIntimacyLevelsFlg && showIntimacyLevelsFlg == 'Y';

  }

}
