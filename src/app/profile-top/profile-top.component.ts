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
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
}
