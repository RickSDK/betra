import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input('src') src: string = '';
  @Input('id') id: string = 'myImg';
  @Input('loadingFlg') loadingFlg: boolean = false;
  @Input('fileId') fileId: string = 'file';
  
  @Output() messageEvent = new EventEmitter<string>();

  public showSubmitButtonFlg: boolean = false;
  public showImageFlg: boolean = false;
  public fileToUpload: any = null;
  public showSelectButtonFlg: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(event: any, id:string) {
    console.log('+++', this.id, id);
    this.showSubmitButtonFlg = false;
    var files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    this.showSelectButtonFlg = false;

    reader.onload = () => {
      var imgFile = reader.result as string;
      console.log('readerLoaded', this.id, imgFile.length);
      this.src = imgFile;
      //$('#' + this.id).attr('src', imgFile);
      var image = new Image();
      image.src = imgFile;
      image.onload = () => {
        console.log('Full size: ', image.src.length, image.width, image.height);
        var smallImgSrc = imageToDataUri(image);
        this.src = smallImgSrc;
        var smallImage = new Image();
        smallImage.src = smallImgSrc.toString();
        smallImage.onload = () => {
          //$('#' + this.id).attr('src', smallImgSrc);
          console.log('New Size: ', this.id, smallImage.src.length, smallImage.width, smallImage.height);
        };
      };
    };

    reader.readAsDataURL(this.fileToUpload);
    this.showSubmitButtonFlg = true;
    this.showImageFlg = true;
  }
  cancelUpload() {
    this.showSubmitButtonFlg = false;
    this.showSelectButtonFlg = true;
  }
  uploadImageButtonClicked() {
    this.showSubmitButtonFlg = false;
    this.messageEvent.emit('upload');
  }
}

function imageToDataUri(img: any) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var MAXSIZE = 600;
  var pct;
  if (img.width > img.height) {
    if (img.width > MAXSIZE) {
      pct = MAXSIZE / img.width;
    } else {
      return img.src;
    }
  } else {
    if (img.height > MAXSIZE) {
      pct = MAXSIZE / img.height;
    } else {
      return img.src;
    }
  }

  var newHeight = img.height * pct;
  var newWidth = img.width * pct;

  if (newHeight < 200 || newWidth < 200) {
    return img.src;
  }

  canvas.height = newHeight;
  canvas.width = newWidth;

  // set its dimension to target size
  //canvas.width = width;
  //canvas.height = height;

  // draw source image into the off-screen canvas:
  if (ctx)
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
  // encode image to data-uri with base64 version of compressed image
  //jw1945 so the default is png... from canvas
  // we want to use jpeg and we will
  //set the quality to .8 to save on space
  //in database quality looks pretty good can adjust
  //quality values are 1.0 to 0.1
  return canvas.toDataURL('image/jpeg', 0.8);
}