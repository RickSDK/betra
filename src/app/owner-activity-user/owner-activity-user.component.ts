import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner-activity-user',
  templateUrl: './owner-activity-user.component.html',
  styleUrls: ['./owner-activity-user.component.scss']
})
export class OwnerActivityUserComponent implements OnInit {
  @Input('owner') owner: any = null;
  @Input('leaderFlg') leaderFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: any) {
    //console.log('xxx', this.owner);
  }
}
