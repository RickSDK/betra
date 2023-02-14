import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../classes/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent extends BaseComponent implements OnInit {
  public reviewList: any = [];
  public reviewId: number = 0;

  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.reviewId = parseInt(params['id']) || 0;
    });
    this.getDataFromServer('getReviews', 'betraReviews.php', {reviewId: this.reviewId});
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getReviews') {
      this.reviewList = [];
      responseJson.reviews.forEach((element: any) => {
        this.reviewList.push(new Review(element, this.user.user_id));
      });
    }
  }
}
