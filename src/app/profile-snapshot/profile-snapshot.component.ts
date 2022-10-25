import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-snapshot',
  templateUrl: './profile-snapshot.component.html',
  styleUrls: ['./profile-snapshot.component.scss']
})
export class ProfileSnapshotComponent implements OnInit {
  @Input('user') user: any = null;
  @Input('responseJson') responseJson: any = null;
  @Input('matchObj') matchObj: any = null;
  @Output() messageEvent = new EventEmitter<string>();
  public menuNum = 0;

  constructor() { }

  ngOnInit(): void {
  }
  findMatches() {
    this.messageEvent.emit('search');
  }
  seeMyMatches() {
    this.messageEvent.emit('seeMatches');
  }
  changeMenuNum(menuNum: number) {
    this.menuNum = menuNum;
  }
  ngClassButtonGroup(num: number) {
    if (num == this.menuNum)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }

}
