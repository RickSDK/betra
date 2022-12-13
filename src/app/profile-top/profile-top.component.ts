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
  public showAdminButtonsFlg: boolean = false;
  public showMoreFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
    this.user.mainImageSrc = this.user.imgSrc;
    this.showMoreFlg = false;
//    this.lookingForTitle = this.user.maritalStatus + ' ' + this.user.genderName + ' ' + 'seeking ' + this.user.matchGender;
  }

  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
  showMoreClicked() {
    this.showMoreFlg = !this.showMoreFlg;
    this.messageEvent.emit('show-more');
  }
  sendClickEventUp(name: string) {
    this.showAdminButtonsFlg = false;
    this.messageEvent.emit(name);
  }
  likeButtonClicked(likedFlg: boolean) {
    this.user.matchObj.showButtonsFlg = false;
    if (likedFlg)
      this.messageEvent.emit('yesToMatch');
    else
      this.messageEvent.emit('noToMatch');
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
      return 'user-profile-image';
  }
}
