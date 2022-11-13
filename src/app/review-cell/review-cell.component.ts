import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-cell',
  templateUrl: './review-cell.component.html',
  styleUrls: ['./review-cell.component.scss']
})
export class ReviewCellComponent implements OnInit {
  @Input('review') review: any = null;
  @Input('index') index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
