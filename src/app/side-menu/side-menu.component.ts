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

  public filterSelectedFlg = false;
  public topItems = [
    { name: 'Home', routerLink: '', icon: 'fa fa-home', id: 0 },
    { name: 'Browse', routerLink: '/user-detail', icon: 'fa fa-search', id: 2 },
    { name: 'Dating Pool', routerLink: '/matches', icon: 'fa fa-users', id: 3 },
    { name: 'Admirers', routerLink: '/user-detail', icon: 'fa fa-heart', id: 4 },
    //    { name: 'Online Today', routerLink: '/user-detail', icon: 'fa fa-bolt', id: 5 },
    { name: 'Top 10', routerLink: '/top-lists', icon: 'fa fa-list-ol', id: 6 },

  ];
  public middleItems = [
    //    { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments', id: 11 },
    //{ name: 'Reviews', routerLink: '/reviews', icon: 'fa fa-pencil', id: 0 },
    { name: 'Journal', routerLink: '/journal', icon: 'fa fa-book', id: 0 },
  ];
  public bottomItems = [
    { name: 'Settings', routerLink: '/settings', icon: 'fa fa-cog', id: 0 },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (1)
      this.bottomItems.push({ name: 'Verify Pic', routerLink: '/verify-pics', icon: 'fa fa-certificate', id: 0 });

    if (this.headerObj.ownerFlg) {
      this.bottomItems.push({ name: 'Owners', routerLink: '/owners', icon: 'fa fa-briefcase', id: 0 });
      this.bottomItems.push({ name: 'Profile Pic Legit?', routerLink: '/user-detail', icon: 'fa fa-picture-o', id: 7 });
    } else
      this.bottomItems.push({ name: 'Join the Team', routerLink: '/join-team', icon: 'fa fa-briefcase', id: 0 });
  }

  filterSelected(flag: boolean) {
    this.filterSelectedFlg = flag;
  }
  browseSelected() {
    this.router.navigate(['/user-detail'], {queryParams: {id: 2, filter: this.filterSelectedFlg}});
  }

  ngClassMenuItem(menuTitle: string) {
    if (menuTitle == this.pageTitle)
      return 'side-menu-item active-main-color';
    else
      return 'side-menu-item';
  }

}
