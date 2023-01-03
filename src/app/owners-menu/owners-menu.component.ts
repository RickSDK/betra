import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owners-menu',
  templateUrl: './owners-menu.component.html',
  styleUrls: ['./owners-menu.component.scss']
})
export class OwnersMenuComponent implements OnInit {
  @Input('pageTitle') pageTitle: string = '';

  public buttons = [
    { name: 'Details', routerLink: '/owners' },
    { name: 'Overview', routerLink: '/join-team' },
    { name: 'Bugs', routerLink: '/owner-bugs' },
    { name: 'Owners', routerLink: '/owner-users' },
    { name: 'Stats', routerLink: '/owner-stats' },
    { name: 'Activity', routerLink: '/owner-activity' },
    { name: 'Flagged', routerLink: '/flagged-users' },
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

}
