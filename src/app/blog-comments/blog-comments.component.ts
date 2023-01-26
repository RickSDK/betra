import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

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
  public showOptionsFlg: boolean = false;
  public showLikesFlg: boolean = false;
  public showDislikesFlg: boolean = false;
  public selectedComment: any;
  public action: string = '';
  public currentComment: string = '';
  public commentId: number = 0;

  constructor() { super(); }

  override ngOnInit(): void {
    console.log('xxx', this.blog);
  }

  likeButtonPressed() {
    this.blog.likes++;
    this.blog.iLikeFlg = true;
    if (this.user && this.user.user_id > 0)
      this.getDataFromServer('likeBlog', 'blog.php', { blogId: this.blog.row_id });
    else
      this.errorMessage = 'Log in to react to this blog';
  }

  dislikeButtonPressed() {
    this.blog.dislikes++;
    this.blog.iDislikeFlg = true;
    if (this.user && this.user.user_id > 0)
      this.getDataFromServer('dislikeBlog', 'blog.php', { blogId: this.blog.row_id });
    else
      this.errorMessage = 'Log in to react to this blog';
  }

  commentLikeButtonPressed(item: any) {
    item.likes++;
    item.iLikeFlg = true;
    if (this.user && this.user.user_id > 0)
      this.getDataFromServer('likeBlogComment', 'blog.php', { blogId: this.blog.row_id, commentId: item.row_id });
    else
      this.errorMessage = 'Log in to react to this blog';
  }

  commentDislikeButtonPressed(item: any) {
    item.dislikes++;
    item.iDislikeFlg = true;
    if (this.user && this.user.user_id > 0)
      this.getDataFromServer('dislikeBlogComment', 'blog.php', { blogId: this.blog.row_id, commentId: item.row_id });
    else
      this.errorMessage = 'Log in to react to this blog';

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
  replyLinkPressed() {
    this.commentId = 0;
    this.selectedComment = null;
    this.replyToFlg = !this.replyToFlg;
    this.currentComment = '';
    if (this.replyToFlg) {
      setTimeout(() => {
        $('#replyInputText').focus();
      }, 100);
    }
  }
  toggleOptionsMenu(comment:any) {
    this.showOptionsFlg = !this.showOptionsFlg;
    this.selectedComment = comment;
    this.commentId = comment.row_id;
  }
  sumbitReply() {
    var comment = $('#replyInputText').val();
    this.blog.comments.push({ comment: comment, firstName: this.user.firstName, user_id: this.user.user_id, profilePic: this.user.profilePic });

    if (this.user && this.user.user_id > 0)
      this.getDataFromServer('postComment', 'blog.php', { blogId: this.blog.row_id, comment: comment, commentId: this.commentId });
    else
      this.errorMessage = 'Log in to react to this blog';
    this.replyLinkPressed();
  }
  menuOptionPressed(comment: any, action: string) {
    this.showOptionsFlg = false;
    this.action = action;
    if (action == 'flag' || action == 'delete')
      this.selectedComment = comment;
    if (action == 'edit') {
      if (comment.row_id > 0) {
        this.replyToFlg = true;
        this.currentComment = comment.comment;
        this.commentId = comment.row_id;
        this.blog.comments = [];
      } else
        this.errorMessage = 'Sorry, refresh page first.';
    }
  }
  actionVerified() {
    if (this.action == 'flag')
      this.getDataFromServer('flagComment', 'blog.php', { commentId: this.selectedComment.row_id });
    if (this.action == 'delete')
      this.getDataFromServer('deleteComment', 'blog.php', { commentId: this.selectedComment.row_id });
    this.selectedComment = null;
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "deleteComment") {
      this.errorMessage = 'Comment has been deleted.';
      this.blog.comments = [];
    }
    if (responseJson.action == "flagComment") {
      this.errorMessage = 'Comment flagged. Thank you.';
    }
  }

}
