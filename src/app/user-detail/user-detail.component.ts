import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { MatchSnapshotComponent } from '../match-snapshot/match-snapshot.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(MatchSnapshotComponent) matchSnapshotModal: MatchSnapshotComponent = new (MatchSnapshotComponent);

  public uid: number = 0;
  public pageTitle = 'User Detail';
  public matchUser: any = null;
  public calculatingStatsFlg = true;
  public matchObj = { status: 'not started', matchesFound: 0, progressPercent: 0, currentMatch: 0 };

  constructor(private route: ActivatedRoute, private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
      if (this.uid > 0)
        this.loadThisUser()
    })
  }
  loadThisUser() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      uid: this.uid,
      action: "getThisUser"
    };
    this.executeApi('appApiCode2.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'removeThisUser') {
      this.router.navigate(['']);
    }
    if (responseJson.action == 'getThisUser') {
      this.matchUser = new User(responseJson.user);
      this.pageTitle = this.matchUser.firstName;
      this.calculatingStatsFlg = true;
      //console.log('this.matchUser', this.matchUser);

      setTimeout(() => {
        this.calculatingStatsFlg = false;
        this.matchSnapshotModal.calculateMatches(this.user, this.matchUser, this.matchObj);
      }, 1500);
    }
    if (responseJson.action == "yesToMatch" && responseJson.action2 == "match made") {
      console.log('xxx refresh made!');
      this.refreshUserObj(responseJson.user);
      this.loadThisUser();
    }

  }
  matchSnapshotEvent(action: string) {
    if (action == 'remove')
      action = 'removeThisUser';
    if (action == 'ban')
      action = 'banThisUser';
    console.log('matchSnapshotEvent', action);

    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      action: action
    };
    this.executeApi('appApiCode2.php', params, true);
  }

}
