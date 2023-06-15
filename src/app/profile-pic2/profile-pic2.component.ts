import { Component, OnInit, Input } from '@angular/core';

declare var betraImageFromId: any;

@Component({
  selector: 'app-profile-pic2',
  templateUrl: './profile-pic2.component.html',
  styleUrls: ['./profile-pic2.component.scss']
})
export class ProfilePic2Component implements OnInit {
  @Input('user_id') user_id: number = 0;
  @Input('profilePic') profilePic: number = 0;
  @Input('size') size: number = 60;
  public src: string = '';

  constructor() { }


  ngOnInit(): void {
    this.src = betraImageFromId(this.user_id, this.profilePic);
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

}
