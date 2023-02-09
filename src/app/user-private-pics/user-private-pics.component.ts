import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-user-private-pics',
  templateUrl: './user-private-pics.component.html',
  styleUrls: ['./user-private-pics.component.scss']
})
export class UserPrivatePicsComponent extends BaseComponent implements OnInit {
  @Input('myUser') myUser: any = null;
  @Input('matchUser') matchUser: any = null;
  public openPanelFlg: boolean = false;
  public mySrc: string = '';
  public yourSrc: string = '';
  public myPics: any = [];
  public matchPics: any = [];

  constructor() { super(); }

  override ngOnInit(): void {
  }

  openPanel() {
    this.openPanelFlg = !this.openPanelFlg;
    if (this.openPanelFlg)
      this.processAPIRequest('getPrivatePics');
  }
  processAPIRequest(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      matchId: this.matchUser.user_id,
      mid: this.matchUser.matchObj.row_id,
      action: action
    };
    this.executeApi('betraRequests.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'getPrivatePics') {
      this.processPics(responseJson);
    }
  }
  processPics(responseJson: any) {
    this.matchUser.matchObj.newPics = 0;
    if (this.matchUser.matchObj) {
      if (responseJson.myPicString) {
        var numbers = responseJson.myPicString.split(':');
        var myPics: any = [];
        numbers.forEach((number: any) => {
          myPics.push(this.betraPrivateImageFromId(this.myUser.user_id, this.matchUser.user_id, number));
        });
        this.myPics = myPics;
      }
      if (responseJson.matchPicString) {
        var matchPics: any = [];
        var numbers = responseJson.matchPicString.split(':');
        numbers.forEach((number: any) => {
          matchPics.push(this.betraPrivateImageFromId(this.matchUser.user_id, this.myUser.user_id, number));
        });
        this.matchPics = matchPics;
      }
    }
    if (this.myPics.length > 0)
      this.mySrc = this.myPics[0];
    if (this.matchPics.length > 0)
      this.yourSrc = this.matchPics[0];
  }
  betraPrivateImageFromId(userId: number, uid: number, picNum: number) {
    return 'https://www.betradating.com/betraPhp/privateImages/user' + userId + '_' + uid + '_' + picNum + '.jpg';
  }

}
