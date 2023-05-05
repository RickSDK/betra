import { Component, OnInit, Input } from '@angular/core';
import { Journal } from '../classes/journal';

@Component({
  selector: 'app-betra-comment',
  templateUrl: './betra-comment.component.html',
  styleUrls: ['./betra-comment.component.scss']
})
export class BetraCommentComponent implements OnInit {
  @Input('comment') comment: Journal | undefined;
  @Input('userId') userId: number = 0;

  public commentItem: Journal | undefined;


  constructor() { }

  ngOnInit(): void {
    this.commentItem = new Journal(this.comment, this.userId);
    console.log('xxx',  this.commentItem);
  }

}
