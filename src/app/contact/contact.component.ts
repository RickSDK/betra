import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent implements OnInit {
  public showFormFlg: boolean = true;
  constructor() { super(); }

  //  ngOnInit(): void {
  //}

  submitQuery() {
    var email = $('#email').val();
    var message = $('#message').val();
    if(!email || !message) {
      this.errorMessage = 'Fill out form';
      return;
    }
    this.showFormFlg = false;
    this.getDataFromServer('submitQuery', 'appApiCode.php', {email: email, message: message});
  }
}
