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
    { name: 'Main Info', routerLink: '/owner-admin', id: 1 },
    { name: 'More Details', routerLink: '/join-team', id: 2 },
    { name: 'Teams', routerLink: '/owner-teams', id: 3 },
  ]
  public buttons = [
    { name: 'Admin', routerLink: '/owner-admin', id: 0 },
    { name: 'Discussion', routerLink: '/owner-bugs', id: 2 },
    { name: 'Bugs', routerLink: '/owner-bugs', id: 3 },
    { name: 'Activity', routerLink: '/owner-activity', id: 4 },
  ]
  public buttons2 = [
    { name: 'Overview', routerLink: '/join-team', id: 1 },
    { name: 'Details', routerLink: '/owners', id: 1 },
    { name: 'Owners', routerLink: '/owner-users', id: 1 },
    { name: 'Stats', routerLink: '/owner-stats', id: 1 },
  ]
  public buttons3 = [
    { name: 'Org Chart', routerLink: '/owner-teams', id: 0 },
    { name: 'Dev Team', routerLink: '/owner-teams', id: 1 },
    { name: 'Marketing Team', routerLink: '/owner-teams', id: 2 },
    { name: 'Team James', routerLink: '/owner-teams', id: 3 },
    { name: 'Team Halle', routerLink: '/owner-teams', id: 4 },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngClassButton(name: string) {
    if (name == this.pageTitle)
      return 'btn btn-main-color';
    else
      return 'btn btn-secondary';
  }
  ngClassTopButton(page: number) {
    if (page == this.page)
      return 'btn btn-main-color';
    else
      return 'btn btn-secondary';
  }

}
