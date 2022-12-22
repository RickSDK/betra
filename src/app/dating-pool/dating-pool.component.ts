import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dating-pool',
  templateUrl: './dating-pool.component.html',
  styleUrls: ['./dating-pool.component.scss']
})
export class DatingPoolComponent implements OnInit {
  @Input('user') user: any = null;
  @Input('largeFlg') largeFlg: boolean = false;
  public datingPoolLimit: number = 8;

  constructor() { }

  ngOnInit(): void {
    this.datingPoolLimit = (this.user.memberFlg) ? 12 : 8;
  }

}
