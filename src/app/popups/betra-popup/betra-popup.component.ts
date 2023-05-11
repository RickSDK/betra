import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-betra-popup',
  templateUrl: './betra-popup.component.html',
  styleUrls: ['./betra-popup.component.scss']
})
export class BetraPopupComponent implements OnInit {
  public showBetraPopup: boolean = false;
  public popupIsFullyDisplayed: boolean = false;
  public title: string = '';
  public message: string = '';
  public type: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  showPopup(title: string, message: string, type: number = 0) {
    this.title = title;
    this.message = message;
    this.type = type;

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
