import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Review } from '../classes/review';

declare var $: any;

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;

  public requestNum: number = 0;
  public messageSentFlg: boolean = false;
  public sendMessage: string = '';

  public buttonsDisabledFlg: boolean = false;
  public openPanelFlg: boolean = false;

  public reviewList: any = [];
  public experienceRating: number = 0;
  public reviewText: string = '';

  constructor() { super(); }

  override ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.openPanelFlg = false;
    this.requestNum = 0;
  }

  openPanel(num: number) {
    this.sendMessage = '';
    if (this.requestNum == num) {
      this.openPanelFlg = false;
      this.requestNum = 0;
    } else {
      this.requestNum = num;
      this.openPanelFlg = true;
      this.checkButtons();
      if (num == 4)
        this.processAPIRequest('getReviews');
      if (num == 5)
        this.processAPIRequest('getMyReview');
    }
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

  checkButtons() {
    this.buttonsDisabledFlg = this.matchUser.matchObj.match_date_request == 'M' || this.matchUser.matchObj.you_date_request == 'Y' || this.matchUser.matchObj.you_pic_request > 0;
  }

  changeNum(num: number) {
    this.sendMessage = '';
    if (num == this.requestNum)
      this.requestNum = 0;
    else
      this.requestNum = num;
  }
  picUploadTriggered(action: string) {
    console.log('made it back to top', action);
    if (action == 'uploadComplete') {
      //this.matchUser.matchObj.you_pic_request = 0;
      this.checkButtons();
    }
  }
  dateTriggered(action: string) {
    console.log('made it back to top', action);
    this.checkButtons();
  }

  override postSuccessApi(file: string, responseJson: any) {
    if(responseJson.action == 'getMyReview') {
      if (responseJson.review) {
        this.experienceRating = responseJson.review.rating;
        this.reviewText = responseJson.review.message || '';
      }

    }
    if (responseJson.action == 'getReviews') {
      //      this.showReviewsFlg = true;
      this.reviewList = [];
      responseJson.reviews.forEach((element: any) => {
        this.reviewList.push(new Review(element))
      });

      console.log('hey!!', this.reviewList);
    }
    if (responseJson.action == 'submitReview') {
      this.processAPIRequest('getReviews');
    }

  }

  cancelReview() {
    this.openPanel(this.requestNum);
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
    //   this.showDetailsFlg = false;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.matchUser.user_id,
      rating: this.experienceRating,
      message: $('#reviewText').val(),
      firstName: this.myUser.firstName,
      profilePic: this.myUser.profilePic,
      action: 'submitReview'
    };
    console.log('p', params);
    this.requestNum = 4;
    this.executeApi('betraReviews.php', params, true);
  }

}
