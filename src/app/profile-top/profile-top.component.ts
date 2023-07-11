import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-profile-top',
  templateUrl: './profile-top.component.html',
  styleUrls: ['./profile-top.component.scss']
})
export class ProfileTopComponent implements OnInit {
  @Input('user') user: any = new User(null);
  @Input('myUser') myUser: any = new User(null);
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
  public showPopupQuote: boolean = true;
  public displayPopupQuote: boolean = true;
  public showDropdownMenu: boolean = false;
  public displayDropdownMenu: boolean = false;
  public showTextMenu: boolean = false;
  public displayTextMenu: boolean = false;
  public showInfoMenu: boolean = false;
  public displayInfoMenu: boolean = false;
  public showPicsMenu: boolean = false;
  public displayPicsMenu: boolean = false;
  public showDPMenu: boolean = false;
  public displayDPMenu: boolean = false;

  public textNotice: string = 'With Betra, users must be in each other\'s dating pools to communicate';

  constructor() { }

  ngOnInit(): void {
    this.pictureIndex = 1;
    this.showPopupQuote = true;
    this.displayPopupQuote = true;
    this.showOptionsFlg = false;
    this.showTextWarning = false;
    if (this.user) {
      this.pictureIndexMax = this.user.numPics + 1;
      this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
      this.user.mainImageSrc = this.user.imgSrc;

      this.setTextNotice();

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

  setTextNotice() {
    if (this.user.matchObj) {
      if (this.user.matchObj.match_level >= 2)
        this.textNotice = 'Scroll down to text';
      if (this.user.matchObj.showButtonsFlg)
        this.textNotice = 'With Betra, you can only communicate with people in your dating pool. Click thumbs up if you would like to let ' + this.user.firstName + ' know you are interested.';
      if (this.user.matchObj.match_level <= 1 && !this.user.matchObj.match_interested)
        this.textNotice = this.user.firstName + ' has been notified that you are interested but hasn\'t responded, which means you are not able to text at this time.';
      if (this.user.matchObj.match_level == 1 && this.user.matchObj.match_interested == 'Y')
        this.textNotice = this.user.firstName + ' is interested in you, but you said no. To chat, click the 3 dots above and add this person to your dating pool.';
      if (this.user.matchObj.match_level == 1 && this.user.matchObj.match_interested == 'N')
        this.textNotice = this.user.firstName + ' is not interested in you. Sorry, but there are lots of more fish in the sea. Move on to someone else.';
    }
    if (this.user.user_id == this.myUser.user_id || !this.user.findLoveFlg)
      this.textNotice = '';
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  toggleDropdownMenu() {
    if (this.displayDropdownMenu && this.showDropdownMenu) {
      this.showDropdownMenu = false;
      setTimeout(() => {
        if (!this.showDropdownMenu)
          this.displayDropdownMenu = false;
      }, 1000);
    } else {
      this.displayDropdownMenu = true;
      setTimeout(() => {
        this.showDropdownMenu = true;
      }, 10);
    }
  }
  ngStyleDropDown() {
    if (this.showDropdownMenu)
      return { top: '46px', right: '5px', opacity: 1 };
    else
      return { top: '-46px', right: '5px', opacity: 0 };
  }

  toggleTextMenu() {
    if (this.displayTextMenu && this.showTextMenu) {
      this.showTextMenu = false;
      setTimeout(() => {
        if (!this.showTextMenu)
          this.displayTextMenu = false;
      }, 1000);
    } else {
      this.displayTextMenu = true;
      setTimeout(() => {
        this.showTextMenu = true;
      }, 10);
    }
  }
  ngStyleTextMenu() {
    if (this.showTextMenu)
      return { bottom: '40px', right: '100px', opacity: 1, width: '200px' };
    else
      return { bottom: '-40px', right: '100px', opacity: 0, width: '200px' };
  }

  toggleDPMenu() {
    if (this.displayDPMenu && this.showDPMenu) {
      this.showDPMenu = false;
      setTimeout(() => {
        if (!this.showDPMenu)
          this.displayDPMenu = false;
      }, 1000);
    } else {
      this.displayDPMenu = true;
      setTimeout(() => {
        this.showDPMenu = true;
      }, 10);
    }
  }
  ngStyleDPMenu() {
    if (this.showDPMenu)
      return { height: 'auto', 'min-height': '40px', opacity: 1 };
    else
      return { height: 0, 'min-height': 0, opacity: 0 };
  }

  toggleInfoMenu() {
    if (this.displayInfoMenu && this.showInfoMenu) {
      this.showInfoMenu = false;
      setTimeout(() => {
        if (!this.showInfoMenu)
          this.displayInfoMenu = false;
      }, 1000);
    } else {
      this.displayInfoMenu = true;
      setTimeout(() => {
        this.showInfoMenu = true;
      }, 10);
    }
  }
  ngStyleInfoMenu() {
    if (this.showInfoMenu)
      return { bottom: '40px', left: '130px', opacity: 1 };
    else
      return { bottom: '-200px', left: '130px', opacity: 0 };
  }

  togglePicsMenu() {
    if (this.displayPicsMenu && this.showPicsMenu) {
      this.showPicsMenu = false;
      setTimeout(() => {
        if (!this.showPicsMenu)
          this.displayPicsMenu = false;
      }, 1000);
    } else {
      this.displayPicsMenu = true;
      setTimeout(() => {
        this.showPicsMenu = true;
      }, 10);
    }
  }
  ngStylePicsMenu() {
    if (this.showPicsMenu)
      return { height: '50px', opacity: 1 };
    else
      return { height: 0, opacity: 0 };
  }

  requestPic() {
    window.scrollTo(0, 0);
  }

  showMyReputation() {
    this.messageEvent.emit('showReputation');
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
  toggleQuote() {
    this.showPopupQuote = !this.showPopupQuote;
    if (!this.showPopupQuote) {
      setTimeout(() => {
        this.displayPopupQuote = false;
      }, 1000);
    }
  }
  showMoreClicked() {
    this.displayPopupQuote = true;
    this.hideProfileBasics();
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
    this.messageEvent.emit('showImage');
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
