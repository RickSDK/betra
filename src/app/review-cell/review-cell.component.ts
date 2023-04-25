import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-review-cell',
  templateUrl: './review-cell.component.html',
  styleUrls: ['./review-cell.component.scss']
})
export class ReviewCellComponent extends BaseComponent implements OnInit {
  @Input('review') review: any = null;
  @Input('index') index: number = 0;
  @Output() messageEvent = new EventEmitter<string>();

  public showOptionsFlg: boolean = false;
  public showDeletePopup: boolean = false;
  public showFlagPopup: boolean = false;
  public message: string = '';
  public reviewDeletedFlg: boolean = false;
  public showLikeNamesFlg: boolean = false;
  public showDislikeNamesFlg: boolean = false;
  public rebuttalFlg: boolean = false;
  public strLength: number = 0;


  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }

  menuOptionPressed(action: string) {
    this.showOptionsFlg = false;
    if (action == 'delete')
      this.showDeletePopup = true;
    if (action == 'flag')
      this.showFlagPopup = true;
    if (action == 'edit') {
      this.messageEvent.emit('edit');
    }
    if (action == 'rebuttal') {
      this.rebuttalFlg = true;
      setTimeout(() => {
        var d = (document.getElementById('rebuttalText') as HTMLInputElement);
        if (d)
          d.focus();
      }, 500);

    }
  }

  sumbitRebuttal() {
    var rebuttalText = $('#rebuttalText').val();
    var params = { reviewId: this.review.row_id, rebuttalText: rebuttalText }
    this.getDataFromServer('sumbitRebuttal', 'betraReviews.php', params);
    this.review.rebuttalText = rebuttalText;
    this.rebuttalFlg = false;
  }

  inputValueChanged(event: any) {
    var e = (document.getElementById('rebuttalText') as HTMLInputElement);
    if (e) {
      var value = event.target.value.replace(/`/g, '');
      e.value = value;
      this.strLength = value.length;
    }
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
