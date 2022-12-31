import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;
@Component({
  selector: 'app-verify-pics',
  templateUrl: './verify-pics.component.html',
  styleUrls: ['./verify-pics.component.scss']
})
export class VerifyPicsComponent extends BaseComponent implements OnInit {

  public verifiedIdeas: any = [
    'none',
    'Thumbs-up in front of your mouth',
  ];
  public ideaNum: number = 1;
  public status: string = 'New';
  public firstName: string = '';
  public usersToVerify: any = [];
  public picCertificateNum: number = 0;
  public picCertificateFlg: boolean = false;
  public rejectionReasons: any = [
    'empty',
    'No Face',
    'Not same person',
    'Bad Picture',
    'Wrong Pose'
  ]

  constructor() { super(); }

  override ngOnInit(): void {
    this.loadUserObj();
    this.getServerStuff('checkVerifylImage');
  }

  getServerStuff(action: string) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: action,
    };
    this.executeApi('verifyPics.php', params, true);
  }

  verifyUserPic(num: number, uid: number) {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      ideaNum: num,
      uid: uid,
      action: 'verifyUserPic',
    };
    console.log(params);
    this.executeApi('verifyPics.php', params, true);
  }

  uploadImage(action: string) {
    this.picCertificateNum = 0;
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      ideaNum: this.ideaNum,
      action: 'uploadVerifylImage',
      image: $('#myImg').attr('src')
    };
    this.executeApi('verifyPics.php', params, true);
    //console.log('uploadImage!!', params);
  }

  override postSuccessApi(file: string, responseJson: any) {
    if (responseJson.action == 'uploadVerifylImage') {
      this.status = 'Submitted';
    }
    if (responseJson.action == 'checkVerifylImage') {
      this.picCertificateNum = responseJson.picCertificateNum * -1;
      this.picCertificateFlg = (responseJson.picCertificateFlg == 'Y');
      this.usersToVerify = [];
      responseJson.usersToVerify.forEach((element: any) => {
        element.imageSrc = this.betraImageFromId(element.user_id, element.profilePic);
        this.firstName = element.firstName;
        element.verifySrc = 'https://www.appdigity.com/betraPhp/verifyPics/pic' + element.user_id + '.jpg';
        this.usersToVerify.push(element);
      });

      if (responseJson.action == 'checkVerifylImage' && responseJson.picCertificateNum > 0)
        this.status = 'Submitted';

      
      console.log('xxx', this.status, this.usersToVerify);

    }
    if(responseJson.action == 'verifyUserPic') {
      this.getServerStuff('checkVerifylImage');
    }
  }

}
