import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-betra-popup2',
  templateUrl: './betra-popup2.component.html',
  styleUrls: ['./betra-popup2.component.scss']
})
export class BetraPopup2Component implements OnInit {
  public showPopupFlg: boolean = false;
  public title: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  showPopup(title: string = '') {
    this.title = title;
    this.showPopupFlg = true;
  }

  hidePopup() {
    this.showPopupFlg = false;
  }
}
