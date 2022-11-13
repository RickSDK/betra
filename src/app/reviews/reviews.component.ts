import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var betraImageFromId: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent extends BaseComponent implements OnInit {
  public reviewList:any = [];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAllReviews();
  }
  getAllReviews() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getReviews"
    };
    console.log(params);
    this.executeApi('betraReviews.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'getReviews') {
      this.reviewList = responseJson.reviews;
      this.reviewList.forEach((element: any) => {
        element.src = betraImageFromId(element.uid, element.profilePic);
        element.src2 = betraImageFromId(element.user_id, element.profilePic2);
        element.localDt = this.localDateFrommySqlDate(element.created);
      });
    }
  }
}
