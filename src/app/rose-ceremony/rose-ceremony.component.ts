import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../classes/user';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';
import { ProfilePopupComponent } from '../popups/profile-popup/profile-popup.component';
import { DatabaseService } from '../services/database.service';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rose-ceremony',
  templateUrl: './rose-ceremony.component.html',
  styleUrls: ['./rose-ceremony.component.scss']
})
export class RoseCeremonyComponent extends BaseComponent implements OnInit {
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  @ViewChild(PicturePopupComponent, { static: true })
  picturePopupComponent!: PicturePopupComponent;

  @ViewChild(ProfilePopupComponent, { static: true })
  profilePopupComponent!: ProfilePopupComponent;

  public showWritingFlg: boolean = false;
  public displayUser: any = null;
  //  public previewModeFlg: boolean = true;
  public previewModeFlg2: boolean = false;
  public numSingles: number = 0;
  public rosesRemaining: number = 0;
  public daysTillCeremony: number = 0;
  public displayUserCounter: number = 0;
  public users: any = [];
  public showBeginCeremonyButtonFlg: boolean = false;
  public startHandingRosesFlg = false;

  constructor(private router: Router, databaseService: DatabaseService) { super(databaseService) }

  override ngOnInit(): void {
    super.ngOnInit();

    this.menuNum = 0;

    if (!this.user || !this.user.user_id) {
      this.router.navigate(['']);
      return
    }
    this.rosesRemaining = this.user.rosesToHandOut;
    this.numSingles = this.user.numSingles;
    console.log('this.rosesRemaining', this.rosesRemaining, this.numSingles);
    this.getDataFromServer('registerForRoseCeremony', 'roseCeremony.php', {});

  }

  ngClassImage(person: any) {
    if (person.hasRose || this.rosesRemaining > 0)
      return 'profile-image-sm';
    else
      return 'profile-image-sm no-color';
  }

  startNewGame() {
    this.menuNum = 1;
    this.getDataFromServer('findSingles', 'roseCeremony.php', {});
  }

  toggleRose(user: any) {
    if (user.hasRose) {
      this.rosesRemaining++;
      user.hasRose = false;
    } else {
      if (this.rosesRemaining > 0) {
        this.rosesRemaining--;
        user.hasRose = true;
      }
    }
  }

  viewImage(user: any) {
    if (this.picturePopupComponent)
      this.picturePopupComponent.showPopup(user.imgSrc);
  }

  viewProfilePopup(user: any, basicsFlg: boolean) {
    if (this.profilePopupComponent)
      this.profilePopupComponent.showPopup(user, this.user, basicsFlg);
  }


  endRoseCeremony() {

    var rosesHandedOut = 0;
    var picks: any = [];
    this.users.forEach((element: any) => {
      if (element.hasRose)
        rosesHandedOut++;

      var hasRose = (element.hasRose) ? 'Y' : 'N';
      var item = element.user_id.toString() + ':' + hasRose;

      picks.push(item);
    });
    if (this.rosesRemaining > 0 && rosesHandedOut < this.users.length) {
      if (this.picturePopupComponent)
        this.betraPopupComponent.showPopup('Keep handing our roses', 'You still have ' + this.rosesRemaining + ' roses to hand out. Click the check-mark next to pictures of people you are interested in meeting. If you aren\'t interested in anyone else, randomly pic a few just to fill your pool. You can drop them at your next rose ceremony.');
      return;
    }

    this.menuNum = 2;
    var list: string = picks.join('+');
    this.getDataFromServer('roseCeremonyCompleted', 'roseCeremony.php', { list: list });


  }

  showThisUser() {
    if (this.users.length == 0)
      return;
    if (this.displayUserCounter >= this.users.length)
      this.displayUserCounter = 0;
    this.showWritingFlg = true;
    this.displayUser = this.users[this.displayUserCounter++];
    this.showWritingFlg = true;

    //console.log('showing ', this.displayUser.firstName);

    setTimeout(() => {
      this.showWritingFlg = false;
      var e = document.getElementById('roseBg');
      if (e && this.previewModeFlg2) {
        setTimeout(() => {
          this.showThisUser();
        }, 1800); // pause between
      }

    }, 3500); // stays lit
  }

  ngClassMain() {
    if (this.showWritingFlg)
      return 'outter-div in';
    else
      return 'outter-div out';
  }

  meetTheSingles() {
    this.menuNum = 30;
  }

  beginCeremony() {
    this.showBeginCeremonyButtonFlg = false;
    this.showWritingFlg = false;
    this.previewModeFlg2 = false;
    this.startHandingRosesFlg = false;

    setTimeout(() => {
      this.menuNum = 1;
    }, 2000);
  }

  beginHandingOutRoses() {
    this.startHandingRosesFlg = true;
  }



  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);


    if (responseJson.action == 'registerForRoseCeremony') {
      this.menuNum = 99;
      this.daysTillCeremony = responseJson.daysTillCeremony;

    }
    if (responseJson.action == 'roseCeremonyCompleted') {
      this.menuNum = 3;
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == 'findSingles' || responseJson.action == 'loadMyDatingPool') {
      var fullList: any = [];
      if (this.responseJson.playerList) {
        this.responseJson.playerList.forEach((element: any) => {
          fullList.push(new User(element, this.user));
        });

        fullList.sort((a: any, b: any) => {
          return b.matchQualityIndex - a.matchQualityIndex;
        });

        this.users = [];
        var count = 0;
        fullList.forEach((element: any) => {
          if (count++ < this.numSingles) {
            this.users.push(element);
          }
        });

        //console.log('fullList', fullList);
        //console.log('this.users', this.users);

        this.rosesRemaining = this.user.gender == 'F' ? 10 : 20;

        if (responseJson.action == 'loadMyDatingPool' || this.rosesRemaining >= this.users.length) {
          this.rosesRemaining = this.users.length - 3;
          if (this.rosesRemaining > 17)
            this.rosesRemaining = 17;

        }

        if (this.rosesRemaining > 20)
          this.rosesRemaining = 20;
        if (this.rosesRemaining < 1)
          this.rosesRemaining = 1;

        this.previewModeFlg2 = true;

        if (this.users.length > 0) {
          this.showThisUser();
          setTimeout(() => {
            this.showBeginCeremonyButtonFlg = true;
          }, 1000);

        } else {
          this.beginCeremony();
        }
      }
    }
  }
}
