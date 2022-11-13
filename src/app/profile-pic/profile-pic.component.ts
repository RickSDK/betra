import { Component, OnInit, Input } from '@angular/core';

declare var betraImageFromId: any;

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {
  @Input('user_id') user_id: number = 0;
  @Input('profilePic') profilePic: number = 0;
  @Input('size') size: number = 60;
  public src: string = '';

  constructor() { }

  ngOnInit(): void {
    this.src = betraImageFromId(this.user_id, this.profilePic);
  }

}
