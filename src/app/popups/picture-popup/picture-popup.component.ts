import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-popup',
  templateUrl: './picture-popup.component.html',
  styleUrls: ['./picture-popup.component.scss']
})
export class PicturePopupComponent implements OnInit {
  public showBetraPopup: boolean = false;
  public popupIsFullyDisplayed: boolean = false;
  public src: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  showPopup(title: string) {
     this.src = title;

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
