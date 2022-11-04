import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.user)
      return;
  }

}
