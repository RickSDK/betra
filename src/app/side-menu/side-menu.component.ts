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

  public dateCount: number = 0;
  public date2Count: number = 0;
  public ownerAlerts: number = 0;
  public infoObj: any = null
  public toggleInteractMenu: boolean = true;

  public topItems = [
    { name: 'Home', routerLink: '', icon: 'fa fa-home', id: 0 },
    { name: 'Browse', routerLink: '/user-detail', icon: 'fa fa-search', id: 2 },
    { name: 'Dating Pool', routerLink: '/matches', icon: 'fa fa-users', id: 3 },
    { name: 'Admirers', routerLink: '/user-detail', icon: 'fa fa-heart', id: 4 },
    //    { name: 'Online Today', routerLink: '/user-detail', icon: 'fa fa-bolt', id: 5 },
    { name: 'Top 10', routerLink: '/top-lists', icon: 'fa fa-list-ol', id: 6 },

  ];
  public middleItems = [
    { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments', id: 11 },
    { name: 'Blogs', routerLink: '/blogs', icon: 'fa fa-file-text', id: 0 },
    // { name: 'Reviews', routerLink: '/reviews', icon: 'fa fa-pencil', id: 0 },
    //{ name: 'Advice', routerLink: '/advice', icon: 'fa fa-thumbs-up', id: 0 },
    { name: 'Journal', routerLink: '/journal', icon: 'fa fa-book', id: 0 },
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
      picCertificateFlg = this.infoObj.picCertificateFlg;
    }
    this.bottomItems.push({ name: 'Reputation', routerLink: '/reputation', icon: 'fa fa-certificate', id: 0 });

    if (this.date2Count > 0) {
      this.middleItems.push({ name: 'Dates', routerLink: '/user-dates', icon: 'fa fa-calendar', id: 12 });
    }
    if (this.headerObj.ownerFlg) {
      this.bottomItems.push({ name: 'Owners', routerLink: '/owner-admin', icon: 'fa fa-briefcase', id: 13 });
      //this.bottomItems.push({ name: 'Approve Profile Pic', routerLink: '/user-detail', icon: 'fa fa-picture-o', id: 7 });
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
