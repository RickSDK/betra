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
  public circleSize:number = 30;

  constructor() { }


  ngOnInit(): void {
    this.src = betraImageFromId(this.user_id, this.profilePic);
    this.circleSize = this.size+8;
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

}
