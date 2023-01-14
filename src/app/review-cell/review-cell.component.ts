import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-review-cell',
  templateUrl: './review-cell.component.html',
  styleUrls: ['./review-cell.component.scss']
})
export class ReviewCellComponent extends BaseComponent implements OnInit {
  @Input('review') review: any = null;
  @Input('index') index: number = 0;
  public showOptionsFlg: boolean = false;
  public showDeletePopup: boolean = false;
  public showFlagPopup: boolean = false;
  public message: string = '';
  public reviewDeletedFlg: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
  }

  menuOptionPressed(action: string) {
    this.showOptionsFlg = false;
    if (action == 'delete')
      this.showDeletePopup = true;
    if (action == 'flag')
      this.showFlagPopup = true;
  }

  likeReview() {
    this.review.likes++;
    this.review.iLikeFlg = true;
    var params = { reviewId: this.review.row_id }
    this.getDataFromServer('likeReview', 'betraReviews.php', params);
  }

  dislikeReview() {
    this.review.dislikes++;
    this.review.iDislikeFlg = true;
    var params = { reviewId: this.review.row_id }
    this.getDataFromServer('dislikeReview', 'betraReviews.php', params);
  }

  deleteReview() {
    this.showDeletePopup = false;
    this.message = 'Post has been deleted';
    this.reviewDeletedFlg = true;
    var params = { reviewId: this.review.row_id }
    this.getDataFromServer('deleteReview', 'betraReviews.php', params);
  }

  flagReview() {
    this.showFlagPopup = false;
    this.message = 'Post has been flagged';
    var params = { reviewId: this.review.row_id }
    this.getDataFromServer('flagReview', 'betraReviews.php', params);
  }

}
