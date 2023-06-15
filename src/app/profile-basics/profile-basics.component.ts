import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-profile-basics',
  templateUrl: './profile-basics.component.html',
  styleUrls: ['./profile-basics.component.scss']
})
export class ProfileBasicsComponent implements OnInit {
  @Input('user') user: any = new User(null);
  @Input('myUser') myUser: any = new User(null);

  public hasKidsTitle: string = '';
  public wantsKidsTitle: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.user) {
      this.hasKidsTitle = 'Has 1 kid';
      if (this.user.numKids == 0)
        this.hasKidsTitle = 'Has no kids';
      if (this.user.numKids > 1)
        this.hasKidsTitle = 'Has ' + this.user.numKids + ' kids';

      this.wantsKidsTitle = (this.user.wantsKids == 'Yes') ? 'Wants kids' : 'Doesn\'t want kids';
    }
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

}
