import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input('pageTitle') pageTitle: string = '';

  public topItems = [
    { name: 'My Profile', routerLink: '', icon: 'fa fa-user' },
    { name: 'Browse', routerLink: '/browse-singles', icon: 'fa fa-search' },
    { name: 'My Matches', routerLink: '/matches', icon: 'fa fa-users' },
    { name: 'Online Now', routerLink: '/browse-singles', icon: 'fa fa-bolt' },
  ];
  public middleItems = [
    { name: 'Messages', routerLink: '/messages', icon: 'fa fa-comments' },
    { name: 'Reviews', routerLink: '/reviews', icon: 'fa fa-pencil' },
    { name: 'Journal', routerLink: '/journal', icon: 'fa fa-book' },
  ];
  public bottomItems = [
    { name: 'Settings', routerLink: '/settings', icon: 'fa fa-cog' },
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
