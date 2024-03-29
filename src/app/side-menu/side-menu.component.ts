import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input('pageTitle') pageTitle: string = '';
  @Input('headerObj') headerObj: any = null;
  @Input('messageCount') messageCount: number = 0;
  @Input('matchCount') matchCount: number = 0;
  @Input('slideOverFlg') slideOverFlg: boolean = false;

  public dateCount: number = 0;
  public date2Count: number = 0;
  public ownerAlerts: number = 0;
  public journalCount: number = 0;
  public photographyCount: number = 0;
  public newClasses: number = 0;
  public infoObj: any = null
  public toggleInteractMenu: boolean = true;

  public topItems = [
    { name: 'Home', routerLink: '', icon: 'fa fa-home', id: 0 },
    { name: 'Browse', routerLink: '/browse-singles', icon: 'fa fa-search', id: 2 },
    { name: 'Dating Pool', routerLink: '/matches', icon: 'fa fa-users', id: 3 },
    //    { name: 'Online Today', routerLink: '/user-detail', icon: 'fa fa-bolt', id: 5 },
    { name: 'Photo Club', routerLink: '/photography', icon: 'fa fa-picture-o', id: 15 },
    { name: 'Photo Class', routerLink: '/photo-school', icon: 'fa fa-graduation-cap', id: 16 },
    { name: 'Top 10', routerLink: '/top-lists', icon: 'fa fa-list-ol', id: 6 },

  ];
  public middleItems = [
    { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments', id: 11 },
    // { name: 'Reviews', routerLink: '/reviews', icon: 'fa fa-pencil', id: 0 },
    { name: 'Blogs', routerLink: '/blogs', icon: 'fa fa-file-text', id: 0 },
    { name: 'Polls', routerLink: '/poll', icon: 'fa fa-question-circle', id: 0 },
    //{ name: 'Advice', routerLink: '/advice', icon: 'fa fa-thumbs-up', id: 0 },
    { name: 'Marketplace', routerLink: '/market', icon: 'fa fa-line-chart', id: 0 },
    { name: 'Journal', routerLink: '/journal', icon: 'fa fa-book', id: 14 },
  ];
  public bottomItems = [
    { name: 'Settings', routerLink: '/settings', icon: 'fa fa-cog', id: 0 },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage['infoObj'])
      this.infoObj = JSON.parse(localStorage['infoObj']);

    var picCertificateFlg: string = '';
    if (this.infoObj) {
      this.dateCount = this.infoObj.dateCount;
      this.date2Count = this.infoObj.date2Count;
      this.ownerAlerts = this.infoObj.ownerAlerts;
      this.journalCount = this.infoObj.journalCount;
      this.newClasses = parseInt(this.infoObj.newClasses) + parseInt(this.infoObj.classWorkItems);
      this.photographyCount = parseInt(this.infoObj.newPicCount) + parseInt(this.infoObj.deliveredPicCount);
      picCertificateFlg = this.infoObj.picCertificateFlg;
    }

    if (this.headerObj && this.headerObj.admirerCount > 0)
      this.topItems.push({ name: 'Admirers', routerLink: '/user-detail', icon: 'fa fa-heart', id: 4 });
    //console.log('XXXside menu', this.photographyCount, this.infoObj);

    this.toggleInteractMenu = (this.messageCount + this.dateCount + this.journalCount > 0);

    if (!this.headerObj.liteModeFlg)
      this.bottomItems.push({ name: 'Reputation', routerLink: '/reputation', icon: 'fa fa-certificate', id: 0 });

    if (this.date2Count > 0) {
      this.middleItems.push({ name: 'Dates', routerLink: '/user-dates', icon: 'fa fa-calendar', id: 12 });
    }
    if (this.headerObj.ownerFlg) {
      this.bottomItems.push({ name: 'Owners', routerLink: '/owner-admin', icon: 'fa fa-briefcase', id: 13 });
      //this.bottomItems.push({ name: 'Approve Profile Pic', routerLink: '/user-detail', icon: 'fa fa-picture-o', id: 7 });
    }

    if (this.headerObj.liteModeFlg) {
      this.topItems = [
        { name: 'Home', routerLink: '', icon: 'fa fa-home', id: 0 },
        { name: 'Photo Club', routerLink: '/photography', icon: 'fa fa-picture-o', id: 15 },
        { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments', id: 11 },
        { name: 'Blogs', routerLink: '/blogs', icon: 'fa fa-file-text', id: 0 },
        { name: 'Polls', routerLink: '/poll', icon: 'fa fa-question-circle', id: 0 },

      ];
      this.middleItems = [];
    }

  }

  browseSelected(flag: boolean) {
    this.router.navigate(['/user-detail'], { queryParams: { id: 2, filter: flag } });
  }

  ngClassMenuItem(menuTitle: string) {
    if (menuTitle == this.pageTitle)
      return 'side-menu-item active-main-color';
    else
      return 'side-menu-item';
  }

}
