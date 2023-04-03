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

    //    var datingPoolLimit = (this.user.memberFlg) ? 12 : 8;
    //    this.exceededPoolSizeFlg = this.user.datingPool.length > datingPoolLimit;
    this.getDataFromServer('logUser', 'appApiCode.php', { refreshFlg: 'Y' })
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == "logUser" && responseJson.user) {
      this.user = new User(responseJson.user);


      console.log('hey!!', this.user);
    }
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
    this.router.navigate(['/user-detail'], { queryParams: { id: 2 } });
  }

}
