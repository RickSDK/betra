import { Component, OnInit, Input } from '@angular/core';

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
  

  public topItems = [
    { name: 'My Profile', routerLink: '', icon: 'fa fa-user', id: 0 },
    { name: 'Browse', routerLink: '/user-detail', icon: 'fa fa-search', id: 2 },
    { name: 'My Matches', routerLink: '/matches', icon: 'fa fa-users', id: 3 },
    { name: 'Admirers', routerLink: '/user-detail', icon: 'fa fa-heart', id: 4},
//    { name: 'Online Today', routerLink: '/user-detail', icon: 'fa fa-bolt', id: 5 },
    { name: 'Top 10', routerLink: '/top-lists', icon: 'fa fa-list-ol', id: 6 },
    
  ];
  public middleItems = [
//    { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments', id: 11 },
    { name: 'Reviews', routerLink: '/reviews', icon: 'fa fa-pencil', id: 0 },
    { name: 'Journal', routerLink: '/journal', icon: 'fa fa-book', id: 0 },
  ];
  public bottomItems = [
    { name: 'Settings', routerLink: '/settings', icon: 'fa fa-cog', id: 0 },
 //   { name: 'Documentation', routerLink: '/documentation', icon: 'fa fa-file-text', id: 0 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngClassMenuItem(menuTitle: string) {
    if (menuTitle == this.pageTitle)
      return 'side-menu-item active-menu';
    else
      return 'side-menu-item';
  }

}
