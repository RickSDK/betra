import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-card',
  templateUrl: './scroll-card.component.html',
  styleUrls: ['./scroll-card.component.scss']
})
export class ScrollCardComponent implements OnInit {
  @Input('item') item: any = null;
  @Output() messageEvent = new EventEmitter<string>();

  public showMenuFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clearItem() {
    this.showMenuFlg = false;
    this.messageEvent.emit('clearItem');
  }
}
