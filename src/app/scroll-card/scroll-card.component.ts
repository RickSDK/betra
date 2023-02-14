import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-card',
  templateUrl: './scroll-card.component.html',
  styleUrls: ['./scroll-card.component.scss']
})
export class ScrollCardComponent implements OnInit {
  @Input('item') item: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
