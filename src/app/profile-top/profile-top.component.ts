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
  //  @Input('distance') distance: string = '';
  @Input('adminFlg') adminFlg: boolean = false;
  @Input('expandBottomFlg') expandBottomFlg: boolean = false;
  @Input('snapshotFlg') snapshotFlg: boolean = false;


  @Output() messageEvent = new EventEmitter<string>();
  public largeImageFlg: boolean = false;
  public showSmallerPicsFlg: boolean = true;
  public unblurPicsFlg: boolean = false;
  public showAdminButtonsFlg: boolean = false;
  public showOptionsFlg: boolean = false;
  public pictureIndex: number = 0;
  public pictureIndexMax: number = 0;
  public showBlockPopupFlg: boolean = false;
  public showFlagPopupFlg: boolean = false;
  public showFlagPopup2Flg: boolean = false;
  public hasKidsTitle: string = '';
  public wantsKidsTitle: string = '';
  public showNewUserPopupFlg: boolean = true;
  public showTextWarning = false;
  public showProfileBasicsFlg: boolean = false;
  public profileBasicsClassFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.pictureIndex = 1;
    this.showOptionsFlg = false;
    this.showTextWarning = false;
    if (this.user) {
      this.pictureIndexMax = this.user.numPics + 1;
      this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
      this.user.mainImageSrc = this.user.imgSrc;

      if (this.showNewUserPopupFlg)
        this.showNewUserPopupFlg = (this.myUser.statsObj && this.myUser.statsObj.score == 0);
      this.hasKidsTitle = 'Has 1 kid';
      if (this.user.numKids == 0)
        this.hasKidsTitle = 'Has no kids';
      if (this.user.numKids > 1)
        this.hasKidsTitle = 'Has ' + this.user.numKids + ' kids';
      if (!this.myUser.memberFlg)
        this.pictureIndexMax = 1;
      this.wantsKidsTitle = (this.user.wantsKids == 'Yes') ? 'Wants kids' : 'Doesn\'t want kids';

    }
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  menuOptionClicked(num: number) {
    this.showOptionsFlg = false;
    this.showBlockPopupFlg = (num == 1);
    this.showFlagPopupFlg = (num == 2);
  }
  changePicture(num: number) {
    this.pictureIndex += num;
    this.pictureIndexMax = this.user.numPics + 1;
    if (this.pictureIndex > 0 && this.pictureIndex <= this.pictureIndexMax)
      this.viewImageThumbnail(this.pictureIndex - 1);
    else
      this.pictureIndex = 1;
  }
  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
  showMoreClicked() {
    this.showOptionsFlg = false;
    this.messageEvent.emit('show-more');
  }
  closePopup() {
    this.messageEvent.emit('close-popup');
  }
  sendClickEventUp(name: string) {
    this.showBlockPopupFlg = false;
    this.showFlagPopupFlg = false;
    if (name == 'flagUser') {
      this.showFlagPopup2Flg = true;
    }
    this.showAdminButtonsFlg = false;
    this.showOptionsFlg = false;
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
    this.showOptionsFlg = false;
    this.largeImageFlg = !this.largeImageFlg;
  }
  showProfileBasics() {
    this.messageEvent.emit('show-basics');
    this.showProfileBasicsFlg = true;
    this.profileBasicsClassFlg = false;
    setTimeout(() => {
      this.profileBasicsClassFlg = true;
    }, 100);
  }
  hideProfileBasics() {
    this.profileBasicsClassFlg = false;
    setTimeout(() => {
      this.showProfileBasicsFlg = false;
    }, 1000);
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
