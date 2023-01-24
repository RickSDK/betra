import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $:any;

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent extends BaseComponent implements OnInit {
  @Input('blog') blog: any = null;
  @Input('user') override user: any = null;

  public replyToFlg: boolean = false;
  public strLength: number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    console.log('xxx', this.blog);
  }

  likeButtonPressed() {
    this.blog.likes++;
    this.blog.iLikeFlg = true;
    this.getDataFromServer('likeBlog', 'blog.php', {blogId: this.blog.row_id});
  }

  dislikeButtonPressed() {
    this.blog.dislikes++;
    this.blog.iDislikeFlg = true;
    this.getDataFromServer('dislikeBlog', 'blog.php', {blogId: this.blog.row_id});
  }

  commentLikeButtonPressed(item: any) {
    item.likes++;
    item.iLikeFlg = true;
    this.getDataFromServer('likeBlogComment', 'blog.php', {blogId: this.blog.row_id, commentId: item.row_id});

  }
  commentDislikeButtonPressed(item: any) {
    item.dislikes++;
    item.iDislikeFlg = true;
    this.getDataFromServer('dislikeBlogComment', 'blog.php', {blogId: this.blog.row_id, commentId: item.row_id});

  }

  inputValueChanged(event: any) {
    var e = (document.getElementById('replyInputText') as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      value = value.replace(/`/g, '');
      this.strLength = value.length;
      e.value = value;
    }
  }
  sumbitReply() {
    var comment = $('#replyInputText').val();
    this.getDataFromServer('postComment', 'blog.php', {blogId: this.blog.row_id, comment: comment});
  }

}
