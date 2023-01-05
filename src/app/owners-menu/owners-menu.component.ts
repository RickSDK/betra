import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owners-menu',
  templateUrl: './owners-menu.component.html',
  styleUrls: ['./owners-menu.component.scss']
})
export class OwnersMenuComponent implements OnInit {
  @Input('pageTitle') pageTitle: string = '';
  @Input('page') page: number = 0;

  public topButtons = [
    { name: 'Main Info', routerLink: '/owners', id: 1 },
    { name: 'More Details', routerLink: '/join-team', id: 1 },
  ]
  public buttons = [
    { name: 'Details', routerLink: '/owners', id: 1 },
    { name: 'Discussion', routerLink: '/owner-bugs', id: 2 },
    { name: 'Bugs', routerLink: '/owner-bugs', id: 3 },
    { name: 'Activity', routerLink: '/owner-activity', id: 4 },
  ]
  public buttons2 = [
    { name: 'Overview', routerLink: '/join-team', id: 1 },
    { name: 'Owners', routerLink: '/owner-users', id: 1 },
    { name: 'Stats', routerLink: '/owner-stats', id: 1 },
    { name: 'Flagged', routerLink: '/flagged-users', id: 1 },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngClassButton(name: string) {
    if (name == this.pageTitle)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }
  ngClassTopButton(page: number) {
    if (page == this.page)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }

}
