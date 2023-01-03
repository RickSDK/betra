import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dating-pool',
  templateUrl: './dating-pool.component.html',
  styleUrls: ['./dating-pool.component.scss']
})
export class DatingPoolComponent implements OnInit {
  @Input('user') user: any = null;
  @Input('largeFlg') largeFlg: boolean = false;
  @Output() messageEvent = new EventEmitter<string>();

  public datingPoolLimit: number = 8;

  constructor() { }

  ngOnInit(): void {
    this.datingPoolLimit = (this.user.memberFlg) ? 12 : 8;
  }

  ngOnChanges(changes: any) {
    console.log('dating pool', this.user.datingPool);
    this.ngOnInit();
  }

  userClicked(uid: number) {
    this.messageEvent.emit(uid.toString());
  }

}
