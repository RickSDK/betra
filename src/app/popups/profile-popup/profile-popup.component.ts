import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  public showBetraPopup: boolean = false;
  public popupIsFullyDisplayed: boolean = false;
  public user: any = null;
  public myUser: any = null;
  public basicsFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showPopup(user: any, myUser: any, basicsFlg: boolean) {
    this.user = user;
    this.myUser = myUser;
    this.basicsFlg = basicsFlg;

    this.showBetraPopup = true;
    this.popupIsFullyDisplayed = false;
    setTimeout(() => {
      this.popupIsFullyDisplayed = true;
    }, 50);
  }

  ngClassScreen() {
    if (this.popupIsFullyDisplayed)
      return 'gray-bg-screen screen-on';
    else
      return 'gray-bg-screen screen-off'
  }

  ngClassPopup() {
    if (this.popupIsFullyDisplayed)
      return 'popup-outer popup-on';
    else
      return 'popup-outer popup-off'
  }

  hidePopup() {
    this.popupIsFullyDisplayed = false;
    setTimeout(() => {
      this.showBetraPopup = false;
    }, 1000);
  }
}
