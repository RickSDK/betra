import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';

declare var $: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public userId: number = 0;
  public apiMessage: string = '';
  public loadingFlg: boolean = false;
  public apiExecutedFlg: boolean = false;
  public errorMessage: string = '';
  public changesMadeFlg = false;
  public successFlg = false;
  public displayYear = new Date().getFullYear();
  public popupNum: number = 1;
  public user: any;
  public imgSrc:string = 'assets/images/theRock.png';
  public imgSrcFile:string = 'assets/images/theRock.png';
  public apiSuccessFlg: boolean = false;
  public responseJson:any = null;
  public profileCompleteFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadUserObj();
  }
  refreshUserObj(userObj: any) {
    localStorage['User'] = JSON.stringify(userObj);
    this.user = new User(userObj);
    console.log('user refreshed!');
  }
  loadUserObj() {
    this.userId = localStorage['user_id'];
    if (this.userId > 0) {
      var userObj = JSON.parse(localStorage['User']);
      this.user = new User(userObj);
      this.imgSrcFile = this.user.imgSrc;
      console.log('user', this.user);
    }

    this.figureOutPopupSituation();
  }
  figureOutPopupSituation() {
    this.profileCompleteFlg = !!(this.user && this.user.status == 'Active');

    this.popupNum = 0;
    if (!this.userId)
      this.popupNum = 1;
    else if (this.user && this.user.status == 'Pending')
      this.popupNum = 3;
  }
  loginClicked(event: any) {
    console.log('loginClicked!!', event);
    if (!event)
      this.popupNum = 2;
    if (event == 'logout')
      this.loadUserObj();
  }
  getHostname() {
    return 'https://www.appdigity.com/betraPhp/';
  }

  getAPIData(user: any, action: string, noCacheFlg: boolean) {
    var params = {
      userId: user.id,
      code: user.code,
      action: action
    };
    this.executeApi('festApi.php', params, true);
  }
  executeApi(file: string, params: any = null, displaySuccessFlg: boolean = false) {
    if (!params) {
      params =
      {
        Username: localStorage['email'],
        code: localStorage['code']
      };
    }
    this.errorMessage = '';
    var url = this.getHostname() + file;
    var postData = getPostDataFromObj(params);
    this.loadingFlg = true;
    this.apiExecutedFlg = true;
    console.log('fetch...', file);
    fetch(url, postData).then((resp) => resp.text())
      .then((data) => {
        //console.log('response:', data);
        this.loadingFlg = false;
        if (!data) {
          this.postErrorApi(file, 'No reponse received.');
        } else {
          //console.log('data', data);
          this.responseJson = null;
          try {
            this.responseJson = JSON.parse(data);
          } catch(e) {
            console.log('error!', e);
          }
          
          console.log('responseJson', this.responseJson);
          if (this.responseJson && this.responseJson.status == 'Success') {
            this.postSuccessApi(file, this.responseJson);
          } else {
            console.log('Error!!', this.responseJson);
            var error = (this.responseJson && this.responseJson.error)?this.responseJson.error:'No Success status received from '+file;
            this.postErrorApi(file, error);
          }
        }

      })
      .catch(error => {
        this.loadingFlg = false;
        this.postErrorApi(file, error);
      });
  }

  postSuccessApi(file: string, responseJson: any) {
    console.log('postSuccessApi', responseJson);
    //    if (this.spinnerComponent)
    //      this.spinnerComponent.setApiMessage('Success!');
  }
  postErrorApi(file: string, error: string) {
    //    if (this.spinnerComponent) {
    //      this.spinnerComponent.show();
    //     this.spinnerComponent.setApiMessage(error);
    //   }
    this.loadingFlg = false;
    if (error == '')
      error = 'No success message returned';
    this.errorMessage = 'Error: ' + error;
    console.log('postErrorApi', error);
  }
  ngClassBox(flag: boolean) {
    return (flag) ? 'fa fa-check-square-o betra-checkbox' : 'fa fa-square-o betra-checkbox';
  }


}
function getPostDataFromObj(obj: any) {
  var body = JSON.stringify(obj);

  const postData = {
    method: 'POST',
    headers: new Headers(),
    body: body
  };
  return postData;
}