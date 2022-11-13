import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-welcome-popup',
  templateUrl: './welcome-popup.component.html',
  styleUrls: ['./welcome-popup.component.scss']
})
export class WelcomePopupComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { super(); }


  logout() {
    this.messageEvent.emit('logout');
  }
}
