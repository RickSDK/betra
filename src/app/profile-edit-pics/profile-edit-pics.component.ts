import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';

declare var $: any;
declare var cropper: any;

@Component({
  selector: 'app-profile-edit-pics',
  templateUrl: './profile-edit-pics.component.html',
  styleUrls: ['./profile-edit-pics.component.scss']
})
export class ProfileEditPicsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  uploadPicButtonClicked(num: number, action: string, picId: string = 'x') {
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: action,
      picNum: num,
      image: $('#' + picId).attr('src')
    };
    //console.log('uploadPicButtonClicked', params);
    this.executeApi('appApiCode.php', params, true);
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    this.syncUserWithLocalStorage(responseJson);
    if(responseJson.user) {
      this.user = new User(responseJson.user);
      console.log('xxxXXX', this.user);
    }
  }

  /*
    uploadPicButtonClicked(num: number) {
      this.loadingFlg = true;
      var params = {
        userId: this.user.user_id,
        code: localStorage['code'],
        action: 'updateBonusImage',
        picNum: num + 1,
        image: $('#' + this.bonusImages[num]).attr('src')
      };
      //console.log('uploadPicButtonClicked', params);
      this.executeApi('appApiCode.php', params, true);
    }
    public bonusImages = ['Image1', 'Image2', 'Image3', 'Image4'];
    updateImageButtonClicked() {
      this.showSubmitButtonFlg = false;
      var params = {
        userId: this.user.user_id,
        code: localStorage['code'],
        action: 'updateMainImage',
        image: $('#myImg').attr('src')
      };
      //console.log('updateImageButtonClicked', params);
      this.executeApi('appApiCode.php', params, true);
    }
  */
    handleFileInput(event: any) {
      console.log('+++hey');
      var files: FileList = event.target.files;
      var fileToUpload:any = files.item(0);
      var reader = new FileReader();
      reader.onload = function(event) {
        var imgFile = reader.result as string;

//        var data = event.target.result; // the "data url" of the image
        cropper.showImage(imgFile); // hand this to cropper, it will be displayed
      };

      reader.readAsDataURL(fileToUpload);
    }
}
/*
function handleFileSelect() {
  // this function will be called when the file input below is changed
  var file = document.getElementById("fileInput").files[0];  // get a reference to the selected file
  
  var reader = new FileReader(); // create a file reader
  // set an onload function to show the image in cropper once it has been loaded
  reader.onload = function(event) {
    var data = event.target.result; // the "data url" of the image
    cropper.showImage(data); // hand this to cropper, it will be displayed
  };
  
  reader.readAsDataURL(file); // this loads the file as a data url calling the function above once done
}*/