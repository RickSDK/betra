import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
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
  @Input('dateObj') dateObj: any = null;


  public requestNum: number = 0;
  public messageSentFlg: boolean = false;
  public sendMessage: string = '';

  public buttonsDisabledFlg: boolean = false;
  public openPanelFlg: boolean = false;

  public reviewList: any = [];
  public userGifts: any = [];
  public gifts: any = [];
  public experienceRating: number = 0;
  public coins: number = 0;
  public reviewText: string = '';
  public sendGiftDisabledFlg: boolean = true;
  public selectedGift: any = null;
  public showGiftsFlg: boolean = false;
  public giftSentFlg: boolean = false;


  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.openPanelFlg = false;
    this.requestNum = 0;
  }

  openPanel(num: number) {
    this.showGiftsFlg = false;
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
      if (num == 6)
        this.getDataFromServer('giftsForUser', 'gifts.php', { uid: this.matchUser.user_id });
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

  reviewCellEvent(event: any) {
    this.openPanel(5);
  }

  selectGift(gift: any) {
    this.giftSentFlg = false;
    this.selectedGift = gift;
    this.sendGiftDisabledFlg = parseInt(gift.cost) > this.coins;
    if (this.sendGiftDisabledFlg)
      this.selectedGift = null;
  }

  sendGift() {
    this.errorMessage = '';
    var message = $('#textField').val();
    if (message == '') {
      this.errorMessage = 'Please add a short message.';
      return;
    }
    this.sendGiftDisabledFlg = true;
    this.getDataFromServer('sendGift', 'gifts.php', { uid: this.matchUser.user_id, giftId: this.selectedGift.row_id, message: message });
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
  loadGifts() {
    this.getDataFromServer('loadGifts', 'gifts.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log(file, responseJson);
    if (responseJson.action == 'loadGifts') {
      this.gifts = responseJson.gifts;
      this.coins = responseJson.coins;
    }
    if (responseJson.action == 'giftsForUser' || responseJson.action == 'sendGift') {
      this.gifts = [];
      this.userGifts = responseJson.gifts;
      this.coins = responseJson.coins;
      this.showGiftsFlg = true;
    }
    if (responseJson.action == 'sendGift') {
      this.giftSentFlg = true;
    }
    if (responseJson.action == 'getMyReview') {
      if (responseJson.review) {
        this.experienceRating = responseJson.review.rating;
        this.reviewText = responseJson.review.message || '';
      }

    }
    if (responseJson.action == 'getReviews') {
      //      this.showReviewsFlg = true;
      this.reviewList = [];
      responseJson.reviews.forEach((element: any) => {
        this.reviewList.push(new Review(element, this.myUser.user_id))
      });
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
