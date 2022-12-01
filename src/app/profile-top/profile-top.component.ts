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
  @Input('distance') distance: string = '';
  
  @Output() messageEvent = new EventEmitter<string>();
  public largeImageFlg: boolean = false;
  public showSmallerPicsFlg: boolean = true;
  public unblurPicsFlg: boolean = false;
  public lookingForTitle: string = '';

  constructor() { }

  ngOnInit(): void {
    this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
    this.user.mainImageSrc = this.user.imgSrc;
    this.lookingForTitle = this.user.maritalStatus + ' ' + this.user.genderName + ' ' + 'looking for ' + this.user.matchGender;
    //this.calculateDistance();
  }

  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
  toggleImage() {
    this.largeImageFlg = !this.largeImageFlg;
  }
  viewImageThumbnail(num: number) {
    var pictures = [
      this.user.imgSrc,
      this.user.pic1 || '',
      this.user.pic2 || '',
      this.user.pic3 || '',
      this.user.pic4 || '',
    ];
    if (this.unblurPicsFlg)
      this.user.mainImageSrc = pictures[num];
    else {
      this.showSmallerPicsFlg = false;
    }
  }
  ngClassImage() {
    if (this.largeImageFlg)
      return 'profile-image-large';
    else
      return 'profile-image';
  }
}
