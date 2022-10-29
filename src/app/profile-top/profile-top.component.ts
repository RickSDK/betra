import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-profile-top',
  templateUrl: './profile-top.component.html',
  styleUrls: ['./profile-top.component.scss']
})
export class ProfileTopComponent implements OnInit {
  @Input('user') user: any = new User(null);
  @Input('myUser') myUser: any = new User(null);
  @Input('returnFlg') returnFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();
  public largeImageFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
  toggleImage() {
    this.largeImageFlg = !this.largeImageFlg;
  }
  ngClassImage() {
    if (this.largeImageFlg)
      return 'profile-image-large';
    else
      return 'profile-image';
  }
}
