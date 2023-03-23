import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Location } from "@angular/common";
//import { AdsenseModule } from 'ng2-adsense';

declare var getVersion: any;
declare var getPlatform: any;

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {
  @Input('userId') userId: number = 0;
  @Input('userStatus') userStatus: string = '';
  @Input('pageTitle') pageTitle: string = '';
  @Input('imgSrcFile') imgSrcFile: string = 'assets/images/theRock.png';
  @Input('headerObj') headerObj: any = null;
  @Input('popupNum') popupNum: number = 0;
  @Input('stickyBottomFlg') stickyBottomFlg: boolean = false;

  public showMainMenuFlg: boolean = false;
  public showPromotionalBoxesFlg: boolean = false;
  public showAboutInfoFlg: boolean = false;
  public firstName: string = '';
  public appVersion: string = '';
  public adsbygoogle: any;
  public platform: string = getPlatform();
  public showPageFlg: boolean = true;

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.appVersion = getVersion();
    this.showPromotionalBoxesFlg = true;
    this.showAboutInfoFlg = true;
    this.showPageFlg = true;
    if (localStorage['user_id'] > 0 && localStorage['User']) {
      var user = new User(JSON.parse(localStorage['User']));
      if (user && user.user_id > 0) {
        if (user.ip == "76.103.166.98") {
          this.userId = 0;
          return;
        }
        this.firstName = user.firstName;
        this.imgSrcFile = user.imgSrc;
        if (user.status == 'Active')
          this.showPromotionalBoxesFlg = false;
        else {
          if (this.pageTitle != 'Profile')
            this.showPageFlg = false;
        }

      }
      this.showAboutInfoFlg = false;
    }
    if (this.pageTitle == '')
      this.showAboutInfoFlg = true;
    if (this.pageTitle == 'About') {
      this.showPromotionalBoxesFlg = true;
      this.showAboutInfoFlg = true;
    }

    setTimeout(() => {
      (this.adsbygoogle = (window as any).adsbygoogle || []).push({});
    }, 1000);
  }

  goBack() {
    console.log('go back!!!', this.location.getState());
    this.location.back();
  }

  ngClassToggleMenu() {
    if (this.showMainMenuFlg)
      return 'main-menu-popup popup-show';
    else
      return 'main-menu-popup popup-hide';
  }

  toggleMainMenu() {
    this.showMainMenuFlg = !this.showMainMenuFlg;
  }
  loginPressed() {
    console.log('loginPressed');
    // this.messageEvent.emit();
  }
  loginTest() {
    console.log('loginTest!')
    this.userId = 1;
  }
  logout() {
    this.showMainMenuFlg = false;
    this.userId = 0;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.router.navigate([''], { queryParams: { 'logout': 'true' } });
  }
}
