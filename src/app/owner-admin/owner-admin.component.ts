import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';

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
    { name: 'Verify Facebook', routerLink: '/flagged-users', icon: 'fa fa-facebook-square', id: 7, count: 0 },
    { name: 'Verify Instagram', routerLink: '/flagged-users', icon: 'fa fa-instagram', id: 8, count: 0 },
    { name: 'Verify LinkedIn', routerLink: '/flagged-users', icon: 'fa fa-linkedin-square', id: 9, count: 0 },
  ];
  public message = '';
  public src: string = '';
  public verifySrc: string = '';
  public showRecordFlg = false;
  public showFakePicOptionsFlg: boolean = false;
  public displayUser: any = null;
  public usersOnline: any = [];
  public ownersOnline: any = [];
  public potentialUsers: number = 0;
  public likedUsers: number = 0;
  public pageDetail: any = null;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.menuNum = 0;
    this.getDataFromServer('getInfoObj', 'owners.php', []);
  }

  ngStyleReport() {
    if (this.likedUsers == this.potentialUsers)
      return { 'background-color': 'green', 'color': 'white' };

    if (this.likedUsers < this.potentialUsers / 2)
      return { 'background-color': 'red', 'color': 'white' };

    return { 'background-color': 'yellow', 'color': 'black' };
  }

  updateFormBasedOnObj(infoObj: any) {
    this.adminLinks[0].count = infoObj.pic1Count;
    this.adminLinks[1].count = infoObj.userFlaggedCount;
    this.adminLinks[2].count = infoObj.reviewFlaggedCount;
    this.adminLinks[3].count = infoObj.newReviewCount;
    this.adminLinks[4].count = infoObj.journalFlaggedCount;
    this.adminLinks[5].count = infoObj.pic2Count;
    this.adminLinks[6].count = infoObj.facebookCount;
    this.adminLinks[7].count = infoObj.instagramCount;
    this.adminLinks[8].count = infoObj.linkedInCount;
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
    if (this.menuNum == 6)
      this.getDataFromServer('getPicCertifiedUser', 'owners.php', []);
    if (this.menuNum == 7)
      this.getDataFromServer('getFacebookUser', 'reputation.php', []);
    if (this.menuNum == 8)
      this.getDataFromServer('getInstagramUser', 'reputation.php', []);
    if (this.menuNum == 9)
      this.getDataFromServer('getLinkedInUser', 'reputation.php', []);
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
    this.executeApi('owners.php', params, true);
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

    this.showFakePicOptionsFlg = false;
  }

  flaggedUserButtonPressed(action: string) {
    var params = { uid: this.responseJson.user.user_id, reason: 4 };
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

  verifyUserPic(num: number) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      ideaNum: num,
      uid: this.displayUser.user_id,
      action: 'verifyUserPic',
    };
    this.executeApi('verifyPics.php', params, true);
    this.displayUser = null;
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    //console.log('xxx', responseJson);
    this.showRecordFlg = false;
    this.responseJson = responseJson;
    if (responseJson.action == 'approveRejectLink') {
      this.menuNum = 0;
      this.getDataFromServer('getInfoObj', 'owners.php', []);
    }
    if (responseJson.user) {
      this.displayUser = responseJson.user;
      this.src = this.betraImageFromId(this.displayUser.user_id, this.displayUser.profilePic);

    }
    if (responseJson.action == 'getPicCertifiedUser' && responseJson.user) {
      this.displayUser = responseJson.user;
      this.src = this.betraImageFromId(this.displayUser.user_id, this.displayUser.profilePic);
      this.verifySrc = 'https://www.betradating.com/betraPhp/verifyPics/pic' + this.displayUser.user_id + '.jpg';
    }
    if (responseJson.action == 'approveReview') {
      this.getDataFromServer('getNewReview', 'betraReviews.php', []);
    }
    if (responseJson.action == 'getInfoObj') {
      this.pageDetail = responseJson;
      this.usersOnline = [];
      this.ownersOnline = [];
      responseJson.users.forEach((element: { ownerFlg: string; }) => {
        if (element.ownerFlg == 'Y')
          this.ownersOnline.push(element);
        else
          this.usersOnline.push(element);
      });
      this.potentialUsers = 0;
      this.likedUsers = 0;
      responseJson.recentUsers.forEach((element: any) => {
        var usr = new User(element, this.user);
        if (usr.potentialLoveInterestFlg) {

          this.potentialUsers++;
          if (usr.matchObj && usr.matchObj.you_interested && usr.matchObj.you_interested != '')
            this.likedUsers++;
        }
      });

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

  sendWelcomeEmail() {
    this.getDataFromServer('sendWelcomeEmail', 'owners.php', { uid: 1 });
  }

  approveLink(flag: boolean) {
    var params = {
      type: this.responseJson.action,
      uid: this.displayUser.user_id,
      value: (flag) ? 'Y' : 'N'
    }
    this.getDataFromServer('approveRejectLink', 'reputation.php', params);
  }
}
