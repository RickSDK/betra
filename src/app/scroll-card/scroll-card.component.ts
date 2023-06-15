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

  ngStyleCard(item: any) {
    if (item.type == 'Rose Given Out!')
      return { 'background-color': '#ffccff' };

    if (item.type == 'Poll Answered')
      return { 'background-color': '#ccffff' };

    if (item.type == 'New User')
      return { 'background-color': '#ffffcc' };

    if (item.type == 'User Review')
      return { 'background-color': '#ccffcc' };

    if (item.type == 'Photography Club')
      return { 'background-color': '#ccccff' };

    if (item.type == 'Betra Gift')
      return { 'background-color': '#ffcccc' };

    return { 'background-color': 'white' };
  }

  clearItem() {
    this.showMenuFlg = false;
    this.messageEvent.emit('clearItem');
  }
}
