import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  public showDetailsFlg: boolean = false;
  public showReviewsFlg: boolean = false;
  public experienceRating: number = 0;
  public reviewText: string = '';
  public reviewList: any = [];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.user)
      return;
  }
  openReviewPanel() {
    this.showReviewsFlg = !this.showReviewsFlg;
    this.showDetailsFlg = false;
    this.reviewText = '';
    if (this.showReviewsFlg)
      this.processAPIRequest('getReviews');
  }
  cancelReview() {
    this.showDetailsFlg = false;
    this.showReviewsFlg = false;
  }
  writeReview() {
    this.showReviewsFlg = false;
    this.showDetailsFlg = !this.showDetailsFlg;
  }
  selectRating(num: number) {
    this.experienceRating = num;
  }
  ngClassRating(num: number) {
    if (num == this.experienceRating)
      return 'btn btn-primary';
    else
      return 'btn btn-light';
  }
  submitButtonPressed() {
    this.showDetailsFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      rating: this.experienceRating,
      message: $('#reviewText').val(),
      firstName: this.user.firstName,
      profilePic: this.user.profilePic,
      action: 'submitReview'
    };
    console.log('p', params);
    this.executeApi('betraReviews.php', params, true);
  }
  processAPIRequest(action: string) {
    this.reviewList = [];
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      action: action
    };
    this.executeApi('betraReviews.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getReviews') {
      this.showReviewsFlg = true;
      this.reviewList = responseJson.reviews;
      this.reviewList.forEach((element: any) => {
        element.src = betraImageFromId(element.uid, element.profilePic);
        element.src2 = betraImageFromId(element.user_id, element.profilePic2);
      });

      if (responseJson.myObj) {
        this.experienceRating = responseJson.myObj.rating;
        this.reviewText = responseJson.myObj.message || '';

      }
    }
    if(responseJson.action == 'submitReview') {
      this.processAPIRequest('getReviews');
    }

  }
}
function betraImageFromId(user_id: number, profilePic: number) {
  if (user_id > 0 && profilePic > 0)
      return 'https://www.appdigity.com/betraPhp/profileImages/profile' + user_id.toString() + '_' + profilePic.toString() + '.jpg';
  else
      return 'assets/images/theRock.png';
}