import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-profile-user-popup',
  templateUrl: './profile-user-popup.component.html',
  styleUrls: ['./profile-user-popup.component.scss']
})
export class ProfileUserPopupComponent implements OnInit {
  public showPopupFlg: boolean = false;
  public user: any = {};
  public myUser: any = {};
  public displayPopupQuote: boolean = true;
  public showDropdownMenu: boolean = false;
  public displayDropdownMenu: boolean = false;
  public showTextMenu: boolean = false;
  public displayTextMenu: boolean = false;
  public showInfoMenu: boolean = false;
  public displayInfoMenu: boolean = false;
  public showPicsMenu: boolean = false;
  public displayPicsMenu: boolean = false;
  public unblurPicsFlg: boolean = false;
  public userLoadedFlg: boolean = false;
  public toggleImageFlg: boolean = false;
  public textNotice: string = 'With Betra, users must be in each other\'s dating pools to communicate';

  ngOnInit(): void {
  }

  start() {
    this.toggleImageFlg = false;
    this.displayPopupQuote = false;
    this.displayDropdownMenu = false;
    this.displayTextMenu = false;
    this.displayInfoMenu = false;
    this.displayPicsMenu = false;
    this.userLoadedFlg = false;
    this.showPopupFlg = true;
    this.user = null;
    setTimeout(() => {
      //this.userLoadedFlg = true;
    }, 50);
  }
  show(user: any, myUser: any) {
    this.myUser = myUser;
    this.user = new User(user, myUser);
    this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
    this.userLoadedFlg = true;
    console.log('got user!', user);
  }
  closePopup() {
    this.userLoadedFlg = false;
    setTimeout(() => {
      this.showPopupFlg = false;
    }, 700);
  }

  toggleDropdownMenu() {
    if (this.displayDropdownMenu && this.showDropdownMenu) {
      this.showDropdownMenu = false;
      setTimeout(() => {
        if (!this.showDropdownMenu)
          this.displayDropdownMenu = false;
      }, 1000);
    } else {
      this.displayDropdownMenu = true;
      setTimeout(() => {
        this.showDropdownMenu = true;
      }, 10);
    }
  }
  ngStyleDropDown() {
    if (this.showDropdownMenu)
      return { top: '46px', right: '5px', opacity: 1 };
    else
      return { top: '-46px', right: '5px', opacity: 0 };
  }

  toggleTextMenu() {
    if (this.displayTextMenu && this.showTextMenu) {
      this.showTextMenu = false;
      setTimeout(() => {
        if (!this.showTextMenu)
          this.displayTextMenu = false;
      }, 1000);
    } else {
      this.displayTextMenu = true;
      setTimeout(() => {
        this.showTextMenu = true;
      }, 10);
    }
  }
  ngStyleTextMenu() {
    if (this.showTextMenu)
      return { bottom: '40px', right: '100px', opacity: 1, width: '200px' };
    else
      return { bottom: '-40px', right: '100px', opacity: 0, width: '200px' };
  }

  toggleInfoMenu() {
    if (this.displayInfoMenu && this.showInfoMenu) {
      this.showInfoMenu = false;
      setTimeout(() => {
        if (!this.showInfoMenu)
          this.displayInfoMenu = false;
      }, 1000);
    } else {
      this.displayInfoMenu = true;
      setTimeout(() => {
        this.showInfoMenu = true;
      }, 10);
    }
  }
  ngStyleInfoMenu() {
    if (this.showInfoMenu)
      return { bottom: '40px', left: '130px', opacity: 1 };
    else
      return { bottom: '-200px', left: '130px', opacity: 0 };
  }

  togglePicsMenu() {
    if (this.displayPicsMenu && this.showPicsMenu) {
      this.showPicsMenu = false;
      setTimeout(() => {
        if (!this.showPicsMenu)
          this.displayPicsMenu = false;
      }, 1000);
    } else {
      this.displayPicsMenu = true;
      setTimeout(() => {
        this.showPicsMenu = true;
      }, 10);
    }
  }
  ngStylePicsMenu() {
    if (this.showPicsMenu)
      return { bottom: '40px', opacity: 1 };
    else
      return { bottom: 0, opacity: 0 };
  }
  showMoreClicked() {

  }
  showMyReputation() {

  }
  viewImageThumbnail(num: number) {
    var pictures = [
      this.user.imgSrc,
      this.user.pic1 || '',
      this.user.pic2 || '',
      this.user.pic3 || '',
      this.user.pic4 || '',
    ];
    if ((this.myUser.memberFlg || this.myUser.user_id == this.user.user_id))
      this.user.mainImageSrc = pictures[num];
    else {
    }
  }
  ngClassImage() {
    if ((this.myUser.memberFlg || this.myUser.user_id == this.user.user_id))
      return 'profile-image-large';
    else
      return 'user-profile-image';
  }

}
