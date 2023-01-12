import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-owner-admin',
  templateUrl: './owner-admin.component.html',
  styleUrls: ['./owner-admin.component.scss']
})
export class OwnerAdminComponent extends BaseComponent implements OnInit {
  public pageTitle = 'Admin';
  public adminLinks = [
    { name: 'Approve Profile Pic', routerLink: '/flagged-users', icon: 'fa fa-picture-o', id: 0, count: 0 },
    { name: 'Flagged Users', routerLink: '/flagged-users', icon: 'fa fa-user', id: 1, count: 0 },
    { name: 'Flagged Reviews', routerLink: '/flagged-users', icon: 'fa fa-flag', id: 2, count: 0 },
    { name: 'New Reviews', routerLink: '/flagged-users', icon: 'fa fa-pencil', id: 3, count: 0 },
    { name: 'Flagged Journals', routerLink: '/flagged-users', icon: 'fa fa-book', id: 4, count: 0 },
    { name: 'Verify Photo', routerLink: '/flagged-users', icon: 'fa fa-certificate', id: 5, count: 0 },
  ]
  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    if (localStorage['infoObj']) {
      var infoObj = JSON.parse(localStorage['infoObj']);
      this.adminLinks[0].count = infoObj.pic1Count;
      this.adminLinks[1].count = infoObj.userFlaggedCount;
      this.adminLinks[2].count = infoObj.reviewFlaggedCount;
      this.adminLinks[3].count = infoObj.newReviewCount;
      this.adminLinks[4].count = infoObj.journalFlaggedCount;
      this.adminLinks[5].count = infoObj.pic2Count;
      console.log('xxx', infoObj);
    }

  }

}
