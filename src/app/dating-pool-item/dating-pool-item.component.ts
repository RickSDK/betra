import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dating-pool-item',
  templateUrl: './dating-pool-item.component.html',
  styleUrls: ['./dating-pool-item.component.scss']
})
export class DatingPoolItemComponent implements OnInit {
  @Input('person') person: any = {};
  public showDeleteButtons: boolean = false;
  public showIntimacyValuesFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  dropPersonFromDP(person: any) {

  }
}
