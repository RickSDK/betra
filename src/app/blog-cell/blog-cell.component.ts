import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../classes/blog';

@Component({
  selector: 'app-blog-cell',
  templateUrl: './blog-cell.component.html',
  styleUrls: ['./blog-cell.component.scss']
})
export class BlogCellComponent implements OnInit {
  @Input('blog') blog: any = null;
  @Input('fullFlg') fullFlg: boolean = false;
  @Input('editFlg') editFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    //console.log('xxx', this.blog);
  }

}
