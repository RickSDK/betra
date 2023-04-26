import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProfileTopComponent } from '../profile-top/profile-top.component';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-match-snapshot',
  templateUrl: './match-snapshot.component.html',
  styleUrls: ['./match-snapshot.component.scss']
})
export class MatchSnapshotComponent extends BaseComponent implements OnInit {
  @ViewChild(ProfileTopComponent) profileTopComponent: ProfileTopComponent = new (ProfileTopComponent);

  @Input('matchUser') matchUser: any = null;
  @Input('user') override user: any = null;
  @Input('loadingFlg') override loadingFlg: any = null;
  @Input('errorMessage') override errorMessage: any = null;
  @Input('snapshotFlg') snapshotFlg: boolean = false;
  @Input('id') id: number = 0;
  @Input('singleProfileFlg') singleProfileFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public personalityMatch = 0;
  public polyMatch = 0;
  public profileMatch = 0;
  public totalMatch = 0;
  //  public matchObj: any;
  public showMoreOptionsFlg: boolean = false;
  public showConfirmationFlg: boolean = false;
  public action: string = '';
  public showInterestedButtonsFlg: boolean = false;
  public youAreInterestedFlg: boolean = false;
  public showMoreFlg: boolean = false;
  public expandBottomFlg: boolean = false;
  public showBottumButtonsFlg: boolean = false;
  public showSnoopFlg: boolean = false;
  public distance: string = '';


  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    if (this.user && this.matchUser)
      this.initModal(this.matchUser, this.user, null);
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  initModal(matchUser: any, user: any, matchObj: any) {
   this.user = user;
    this.matchUser = matchUser;
    this.showSnoopFlg = false;
    //console.log('xxxinitModal', this.matchUser);
 
    if (this.profileTopComponent) {
      this.profileTopComponent.ngOnInit();
    }

    this.calculateMatches(user, matchUser, matchObj);
  
  }

  buttonPressed(action: string) {
    this.action = action;
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = true;
  }

  calculateMatches(user: any, matchUser: any, matchObj: any = null) {
    console.log('+++calculateMatches+++');

    //this.matchObj = matchObj;
    if (!this.matchUser.matchObj)
      return;

    this.showInterestedButtonsFlg = matchUser.potentialLoveInterestFlg;

    if (this.matchUser.matchObj.match_interested == 'Y')
      this.showInterestedButtonsFlg = true; // handle out of sync

    if (this.id == 7)
      this.showInterestedButtonsFlg = false; // verify pics


    this.youAreInterestedFlg = !!(this.matchUser.matchObj && this.matchUser.matchObj.you_interested);

    //---------------------
    this.matchUser.matchObj.showButtonsFlg = this.showInterestedButtonsFlg && !this.youAreInterestedFlg;
    this.matchUser.matchObj.matchMadeFlg = (this.matchUser.matchObj && this.matchUser.matchObj.match_level == 2);
    //---------------------

    var agePoints = Math.abs(user.matchAge - matchUser.age) <= 4 ? 1 : 0;
    var religionPoints = (user.matchReligion == matchUser.religion|| user.matchReligion == 'No preference') ? 1 : 0;
    var educationPoints = (user.matchEducation == matchUser.educationLevel|| user.matchEducation == 'No preference') ? 1 : 0;
    var kidsPoints = (user.wantsKids == matchUser.wantsKids) ? 1 : 0;
    var hasKids = 1;
    if (user.wantsKids == 'No' && matchUser.numKids > 0)
      hasKids = 0;
    if (user.wantsKids == 'Yes' && matchUser.numKids == 0)
      hasKids = 0;
    var marriagePoints = (user.matchMarriage == matchUser.marriageView|| user.matchMarriage == 'No preference') ? 1 : 0;
    var relationshipPoints = (user.matchRelationship == matchUser.desiredRelationship|| user.matchRelationship == 'No preference') ? 1 : 0;
    var heightPoints = (user.matchHeight == matchUser.bodyHeight|| user.matchHeight == 'No preference') ? 1 : 0;
    var bodyPoints = (user.matchBody == matchUser.bodyType || user.matchBody == 'No preference') ? 1 : 0;
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

    this.totalMatch = Math.round((this.profileMatch + this.polyMatch + this.personalityMatch) / 3);

    this.user.kidsNum = (this.user.matchHasKids == 'No') ? '0' : '99';

    if (this.user.matchHasKids == 'Yes' && this.matchUser.numKids > 0)
      this.user.kidsNum = this.matchUser.numKids;


  }
  expandBottom() {
    this.expandBottomFlg = true;
    this.profileMatch = 0;
    this.polyMatch = 0;
    this.personalityMatch = 0;
    this.totalMatch = 0;
    setTimeout(() => {
      this.showMoreFlg = true;
    }, 400);
    setTimeout(() => {
      this.calculateMatches(this.user, this.matchUser);
    }, 1500);
  }
  collpaseBottom() {
    this.expandBottomFlg = false;
    setTimeout(() => {
      this.showMoreFlg = false;
    }, 400);
  }
  snoopPressed() {
    this.showSnoopFlg = !this.showSnoopFlg;
    if(this.showSnoopFlg)
      this.getDataFromServer('getSnoopData', 'appApiCode.php', {uid: this.matchUser.user_id});
  }
  actionButtonClicked(action: string) {
    if (action == "show-more" && this.matchUser) {
      this.getDataFromServer('showMore', 'appApiCode2.php', {uid: this.matchUser.user_id});
      if (this.showMoreFlg)
        this.collpaseBottom();
      else
        this.expandBottom();
      return;
    }
    if (action == "show-basics") {
      this.getDataFromServer('showBasics', 'appApiCode2.php', {uid: this.matchUser.user_id});
      return;
    }
    if (action == 'yesToMatch' && this.matchUser.matchObj.match_interested == 'Y') {
      this.matchUser.matchObj.matchMadeFlg = true;
      this.showInterestedButtonsFlg = false;
      setTimeout(() => {
        this.messageEvent.emit(action);
      }, 1500);
      return;
    }
    this.profileMatch = 0;
    this.polyMatch = 0;
    this.personalityMatch = 0;
    this.totalMatch = 0;
    //this.matchObj = null;
    this.messageEvent.emit(action);
  }

  clickYesOption() {
    this.showMoreOptionsFlg = false;
    this.showConfirmationFlg = false;
    this.messageEvent.emit(this.action);
  }


}
