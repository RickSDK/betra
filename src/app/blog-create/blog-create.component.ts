import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from '../classes/blog';

declare var $: any;

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent extends BaseComponent implements OnInit {
  public id: number = 0;
  public blog: any = null;
  public override topButtons: any = ['Edit Text', 'Edit Pictures', 'Add Author'];
  public blogTitle: string = '';
  public blogSection1: string = '';
  public blogSection2: string = '';
  public blogSection3: string = '';
  public showDeleteOptionsFlg: boolean = false;
  public src1: string = '';
  public src2: string = '';
  public src3: string = '';
  public blogAuthor: string = '';
  public blogUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || 0;
      if (this.id > 0)
        this.getDataFromServer('getBlog', 'blog.php', { blogId: this.id });
    });
    //window.scrollTo(0, 0);
  }

  submitButtonPressed() {
    var blogTitle = $('#blogTitle').val();
    var section1 = $('#section1').val();
    var section2 = $('#section2').val();
    var section3 = $('#section3').val();
    if (blogTitle == '' || section1 == '') {
      this.errorMessage = 'Fill out required fields';
      return;
    }
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'createOrEditBlog',
      blogTitle: blogTitle,
      section1: section1,
      section2: section2,
      section3: section3,
      blogId: this.id,
    };
    //console.log('params', params);
    this.executeApi('blog.php', params, true);
  }

  submitAuthorButtonPressed() {
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'updateBlogAuthor',
      blogId: this.id,
      blogAuthor: $('#blogAuthor').val(),
      blogUrl: $('#blogUrl').val(),
    };
    console.log('params', params);
    this.executeApi('blog.php', params, true);
  }

  activeButtonPressed() {
    this.getDataFromServer('activateBlog', 'blog.php', { blogId: this.id });
  
  }

  deleteButtonPressed() {
    this.getDataFromServer('deleteBlog', 'blog.php', { blogId: this.id });
  }

  override postSuccessApi(file: string, responseJson: any) {
    //console.log('xxx', responseJson);
    if (responseJson.action == "createOrEditBlog" || responseJson.action == "deleteBlog") {
      this.router.navigate(['/blog-manage']);
    }
    if (responseJson.action == "getBlog") {
      this.blog = new Blog(responseJson.blog);
      this.blogSection1 = this.blog.section1Text;
      this.blogSection2 = this.blog.section2Text;
      this.blogSection3 = this.blog.section3Text;
      this.blogTitle = this.blog.title;
      this.src1 = this.blog.src1;
      this.src2 = this.blog.src2;
      this.src3 = this.blog.src3;
    }

  }

  uploadPicButtonClicked(num: number, action: string, picId: string = 'x') {
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: action,
      picNum: num,
      blogId: this.id,
      image: $('#' + picId).attr('src')
    };
    //console.log('uploadPicButtonClicked', params);
    this.executeApi('blog.php', params, true);
  }
}
