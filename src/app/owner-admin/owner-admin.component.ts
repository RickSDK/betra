import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-owner-admin',
  templateUrl: './owner-admin.component.html',
  styleUrls: ['./owner-admin.component.scss']
})
export class OwnerAdminComponent extends BaseComponent implements OnInit {
  public pageTitle = 'Admin';
  public adminLinks = [
    { name: 'Approve Profile Pic', routerLink: '/flagged-users', icon: 'fa fa-picture-o', id: 1, count: 0 },
    { name: 'Flagged Users', routerLink: '/flagged-users', icon: 'fa fa-user', id: 2, count: 0 },
    { name: 'Flagged Reviews', routerLink: '/flagged-users', icon: 'fa fa-flag', id: 3, count: 0 },
    { name: 'New Reviews', routerLink: '/flagged-users', icon: 'fa fa-pencil', id: 4, count: 0 },
    { name: 'Flagged Journals', routerLink: '/flagged-users', icon: 'fa fa-book', id: 5, count: 0 },
    { name: 'Verify Photo', routerLink: '/flagged-users', icon: 'fa fa-certificate', id: 6, count: 0 },
  ];
  public message = '';
  public src: string = '';
  public showRecordFlg = false;
  public showFakePicOptionsFlg: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.menuNum = 0;
    this.getDataFromServer('getInfoObj', 'owners.php', []);
  }

  updateFormBasedOnObj(infoObj: any) {
    this.adminLinks[0].count = infoObj.pic1Count;
    this.adminLinks[1].count = infoObj.userFlaggedCount;
    this.adminLinks[2].count = infoObj.reviewFlaggedCount;
    this.adminLinks[3].count = infoObj.newReviewCount;
    this.adminLinks[4].count = infoObj.journalFlaggedCount;
    this.adminLinks[5].count = infoObj.pic2Count;
  }

  backToTop() {
    this.menuNum = 0;
    this.message = '';
  }

  fixItem(num: number) {
    this.menuNum = num + 1;
    if (this.menuNum == 1)
      this.getDataFromServer('getNextApprovePicProfile', 'owners.php', []);
    if (this.menuNum == 2)
      this.getDataFromServer('getFlaggedUser', 'owners.php', []);
    if (this.menuNum == 3)
      this.getDataFromServer('getFlaggedReview', 'betraReviews.php', []);
    if (this.menuNum == 4)
      this.getDataFromServer('getNewReview', 'betraReviews.php', []);
    if (this.menuNum == 5)
      this.getDataFromServer('getFlaggedJournal', 'journal.php', []);
  }

  processAPIRequest(action: string) {

  }

  confirmPic() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.responseJson.uid,
      action: 'confirmPic'
    };
    //console.log('params', params);
    this.executeApi('appApiCode.php', params, true);
  }
  rejectPic() {
    var reason = $('#picOption').val();
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.responseJson.uid,
      reason: reason,
      action: 'rejectPic'
    };
    //console.log('params', params);
    if (reason > 0)
      this.executeApi('appApiCode.php', params, true);
  }

  flaggedUserButtonPressed(action: string) {
    var params = { uid: this.responseJson.user.user_id };
    this.getDataFromServer(action, 'owners.php', params);
  }

  reviewReviewed(action: string) {
    var params = { reviewId: this.responseJson.reviewObj.row_id };
    this.getDataFromServer(action, 'owners.php', params);
  }

  journalReviewed(action: string) {
    var params = { journalId: this.responseJson.journal.row_id };
    this.getDataFromServer(action, 'owners.php', params);
  }

  override postSuccessApi(file: string, responseJson: any) {
    this.showRecordFlg = false;
    this.responseJson = responseJson;
    if (responseJson.action == 'approveReview') {
      this.getDataFromServer('getNewReview', 'betraReviews.php', []);
    }
    if (responseJson.action == 'getInfoObj') {
      this.updateFormBasedOnObj(responseJson.infoObj);
      localStorage['infoObj'] = JSON.stringify(responseJson.infoObj);
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'confirmPic' || responseJson.action == 'rejectPic' || responseJson.action == 'rejectJournal' || responseJson.action == 'approveJournal') {
      this.getDataFromServer('getInfoObj', 'owners.php', []);
    }
    if (responseJson.action == 'markAsOk' || responseJson.action == 'suspendUser' || responseJson.action == 'rejectReview' || responseJson.action == 'approveReview') {
      this.getDataFromServer('getInfoObj', 'owners.php', []);
    }
    if (responseJson.action == 'logUser') {
      this.syncUserWithLocalStorage(responseJson);
      this.menuNum = 0;
      this.updateFormBasedOnObj(responseJson.infoObj);
    }
    if (responseJson.action == 'getNextApprovePicProfile') {
      if (responseJson.uid > 0) {
        this.showRecordFlg = true;
        this.src = this.betraImageFromId(responseJson.uid, responseJson.profilePic);
      } else {
        this.message = 'no profiles waiting to be approved.';
      }
    }
  }
}
