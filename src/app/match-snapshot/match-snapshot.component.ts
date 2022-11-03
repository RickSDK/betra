import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-snapshot',
  templateUrl: './match-snapshot.component.html',
  styleUrls: ['./match-snapshot.component.scss']
})
export class MatchSnapshotComponent implements OnInit {
  @Input('matchUser') matchUser: any = null;
  @Input('user') user: any = null;
  @Input('loadingFlg') loadingFlg: boolean = false;
  @Input('errorMessage') errorMessage: string = '';
  @Input('returnFlg') returnFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public personalityMatch = 0;
  public polyMatch = 0;
  public profileMatch = 0;
  public totalMatch = 0;
  public matchObj: any;
  public showMoreOptionsFlg: boolean = false;
  public showConfirmationFlg: boolean = false;
  public action: string = '';


  constructor() { }

  ngOnInit(): void {
    this.showMoreOptionsFlg = (this.user.datingPool.length > 8);
  }

  buttonPressed(action: string) {
    this.action = action;
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = true;
  }

  calculateMatches(user: any, matchUser: any, matchObj: any, initflg: boolean = false) {
    this.matchObj = matchObj;

    var agePoints = Math.abs(user.matchAge - matchUser.age) <= 4 ? 1 : 0;
    var religionPoints = (user.matchReligion == matchUser.religion) ? 1 : 0;
    var educationPoints = (user.matchEducation == matchUser.educationLevel) ? 1 : 0;
    var kidsPoints = (user.wantsKids == matchUser.wantsKids) ? 1 : 0;
    var hasKids = 1;
    if (user.wantsKids == 'No' && matchUser.numKids > 0)
      hasKids = 0;
    if (user.wantsKids == 'Yes' && matchUser.numKids == 0)
      hasKids = 0;
    var marriagePoints = (user.matchMarriage == matchUser.marriageView) ? 1 : 0;
    var relationshipPoints = (user.matchRelationship == matchUser.desiredRelationship) ? 1 : 0;
    var heightPoints = (user.matchHeight == matchUser.bodyHeight) ? 1 : 0;
    var bodyPoints = (user.matchBody == matchUser.bodyType) ? 1 : 0;
    var totalPoints = (agePoints + religionPoints + educationPoints + kidsPoints + hasKids + marriagePoints + relationshipPoints + heightPoints + bodyPoints);

    this.profileMatch = Math.round(100 * totalPoints / 9);
    //-----------------------
    var personalityDiff = Math.abs(user.personalityNum - matchUser.personalityNum);
    this.personalityMatch = Math.round(100 - 100 * (personalityDiff / 14));

    //-----------------------
    var conLibertarian = Math.abs(user.conLibertarian - matchUser.conLibertarian);
    var conStatist = Math.abs(user.conStatist - matchUser.conStatist);
    this.polyMatch = Math.round(100 - 100 * ((conLibertarian + conStatist) / 16));

    if (this.profileMatch < 1)
      this.profileMatch = 1;

    if (this.polyMatch < 1)
      this.polyMatch = 1;

    if (this.personalityMatch < 1)
      this.personalityMatch = 1;

    if (initflg) {
      this.profileMatch = 0;
      this.polyMatch = 0;
      this.personalityMatch = 0;
    }
    this.totalMatch = Math.round((this.profileMatch + this.polyMatch + this.personalityMatch) / 3);

    this.user.kidsNum = (this.user.matchHasKids == 'No') ? '0' : '99';

    if (this.user.matchHasKids == 'Yes' && this.matchUser.numKids > 0)
      this.user.kidsNum = this.matchUser.numKids;

    this.matchUser.longestRelationshipText = this.matchUser.longestRelationship + ' years';

  }
  actionButtonClicked(action: string) {
    this.profileMatch = 0;
    this.polyMatch = 0;
    this.personalityMatch = 0;
    this.totalMatch = 0;
    this.matchObj = null;
    this.messageEvent.emit(action);
  }

  clickYesOption() {
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = false;
    this.messageEvent.emit(this.action);
  }

}
