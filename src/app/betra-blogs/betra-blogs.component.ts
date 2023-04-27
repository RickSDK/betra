import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from '../classes/blog';

@Component({
  selector: 'app-betra-blogs',
  templateUrl: './betra-blogs.component.html',
  styleUrls: ['./betra-blogs.component.scss']
})
export class BetraBlogsComponent extends BaseComponent implements OnInit {
  public blogList: any = [];
  public id: number = 0;
  public blog: any;

  constructor(private router: Router, private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.blogList = [];
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || 0;
      if (this.id > 0)
        this.getDataFromServer('getBlog', 'blog.php', { blogId: this.id });
      else
        this.getDataFromServer('getBlogs', 'blog.php', []);
    });

  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == "getBlogs") {
      this.blogList = [];
      responseJson.blogList.forEach((element: any) => {
        this.blogList.push(new Blog(element));
      });
    }
    if (responseJson.action == "getBlog") {
      this.blogList = [];
      this.blog = new Blog(responseJson.blog);
    }
  }
}
