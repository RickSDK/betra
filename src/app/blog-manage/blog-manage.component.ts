import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Blog } from '../classes/blog';

@Component({
  selector: 'app-blog-manage',
  templateUrl: './blog-manage.component.html',
  styleUrls: ['./blog-manage.component.scss']
})
export class BlogManageComponent extends BaseComponent implements OnInit {
  public blogList: any = [];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getBlogs', 'blog.php', {type: 'All'});
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "getBlogs") {
      responseJson.blogList.forEach((element: any) => {
        this.blogList.push(new Blog(element));
      });
    }
  }

}
