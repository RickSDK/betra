import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-screen',
  templateUrl: './intro-screen.component.html',
  styleUrls: ['./intro-screen.component.scss']
})
export class IntroScreenComponent extends BaseComponent implements OnInit {
  public showWritingFlg: boolean = false;
  public singlesFound: number = 0;
  public numSingles: number = 0;
  public numRoses: number = 0;
  public audio = new Audio('assets/music/song1.mp3');
  public displayUser: any = null;
  public daysTillCeremony: number = 0;

  constructor(private router: Router, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {

    super.ngOnInit();

    if (!this.user || !this.user.user_id) {
      return
    }

    this.numSingles = (this.user.gender == 'F') ? 20 : 40;
    this.numRoses = (this.user.gender == 'F') ? 10 : 20;

    //console.log('hey', this.numSingles, this.numRoses);

    this.menuNum = 0;
    this.showWritingFlg = true;

    this.getDataFromServer('checkRoseCeremonyDt', 'roseCeremony.php', {});

  }

  stopMusic() {
    this.audio.pause();
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('hey!', responseJson);
    if (responseJson.action == 'checkRoseCeremonyDt') {
      if(this.user.status != 'Active') {
        this.menuNum = 44;
        return;
      } else {
        if(responseJson.roseCeremonyDt && responseJson.roseCeremonyDt != null) {
          this.daysTillCeremony = responseJson.daysTillCeremony;
          this.menuNum = 60;
          //this.router.navigate(['/rose-ceremony']);
        }

      }

    }
  }

  beginTheShow() {
    this.audio.loop = false;
    this.audio.play();
    this.showWritingFlg = false;
    setTimeout(() => {
      this.startIntro();
    }, 3000);

  }

  watchAgain() {
    this.showWritingFlg = false;
    setTimeout(() => {
      this.startIntro();
    }, 3000);
  }

  startIntro() {
    this.menuNum = 1;
    this.showWritingFlg = false;
    this.displayMenuItem();
  }

  displayMenuItem() {
    this.menuNum++;
    if (this.menuNum <= 13) {
      this.showWritingFlg = false;
      setTimeout(() => {
        this.showWritingFlg = true;
      }, 50);
      if (this.menuNum < 13) {
        setTimeout(() => {
          this.showWritingFlg = false;
        }, 5000);
        setTimeout(() => {
          this.displayMenuItem();
        }, 7000);
      }
    }
  }

  ngClassMain() {
    if (this.showWritingFlg)
      return 'outter-div in';
    else
      return 'outter-div out';
  }

  startTheGame() {
    this.showWritingFlg = false;
    setTimeout(() => {
      this.showTheCounter();
    }, 3000);
  }

  showTheCounter() {
    this.menuNum = 20;
    this.showWritingFlg = true;

    for (var i = 0; i < this.numSingles; i++) {
      setTimeout(() => {
        this.singlesFound++;
      }, 300 * i);
    }

    setTimeout(() => {
      this.menuNum = 21;
    }, 300 * (this.numSingles+5));
  }

  meetTheSingles() {
    this.audio.pause();
  }

}
