import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-singles',
  templateUrl: './browse-singles.component.html',
  styleUrls: ['./browse-singles.component.scss']
})
export class BrowseSinglesComponent extends BaseComponent implements OnInit {
  public showProfileViewDetailsFlg: boolean = false;
  constructor(private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  browseSingles() {
    if(this.user.profileViews<=0) {
      this.errorMessage = 'Sorry, no swipes remaining today, but don\'t worry, a new batch of singles is available tomorrow!';
      return;
    }
    if(this.user.exceededPoolSizeFlg) {
      this.errorMessage = 'Sorry, your dating pool is over its limit. Fix that first.'
      return;
    }
    if(this.user.showHeartFormFlg) {
      this.errorMessage = 'Sorry, you must hand out a rose first. Visit your dating pool.'
      return;
    }
    if(!this.user.lat) {
      this.errorMessage = 'Sorry, you we can not pinpoint your location. Fix your browser settings or log in with another device to set your location.'
      return;
    }
    this.router.navigate(['/user-detail'], { queryParams: { id: 2 } });
  }

}
