import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image-crop',
  templateUrl: './upload-image-crop.component.html',
  styleUrls: ['./upload-image-crop.component.scss']
})
export class UploadImageCropComponent implements OnInit {
  @Input('src') src: string = '';
  @Input('id') id: string = 'myImg';
  @Input('loadingFlg') loadingFlg: boolean = false;
  @Input('fileId') fileId: string = 'file';

  @Output() messageEvent = new EventEmitter<string>();

  public showSubmitButtonFlg: boolean = false;
  public showImageFlg: boolean = false;
  public fileToUpload: any = null;
  public showSelectButtonFlg: boolean = true;
  //--------------
  public canvasWidth: number = 320;
  public canvasHeight: number = 480;
  public canvas: any;
  public image: any;
  public ctx: any;
  public startPointX: number = 0;
  public startPointY: number = 0;
  public currentPointX: number = 0;
  public currentPointY: number = 0;
  public isDragging: boolean = false;
  public zoomLevel: number = 100;
  public imageWidth: number = 0;
  public imageHeight: number = 0;
  public imageTop: number = 0;
  public imageLeft: number = 0;
  public lastLeft: number = 0;
  public lastTop: number = 0;
  public disableUploadButton: boolean = true;
  public errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
    console.log('canavs!!!', this.canvas);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');


      /*if (this.ctx && this.src) {
        this.image = new Image();
        this.image.src = this.src;

        setTimeout(() => {
          this.ctx.drawImage(this.image, 0, 0);
          this.imageWidth = this.image.width;
          this.imageHeight = this.image.height;
          console.log('size', this.image.width, this.imageHeight);
        }, 100);

      }*/
    } else {
      console.log('no canvas!!');
      this.errorMessage = 'no canvas!!';
      setTimeout(() => {
        this.tryToFindCanvas();
      }, 1000);
    }
  }

  tryToFindCanvas() {
    this.canvas = document.querySelector('canvas');
    if (this.canvas) {
      console.log('canavs found!!!', this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.errorMessage = '';
    }

  }

  handleFileInput(event: any, id: string) {
    console.log('+++', this.id, id);
    this.showSubmitButtonFlg = false;
    var files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    this.showSelectButtonFlg = false;

    reader.onload = () => {
      var imgFile = reader.result as string;
      //console.log('readerLoaded', this.id, imgFile.length);
      //$('#' + this.id).attr('src', imgFile);
      this.image = new Image();
      this.image.src = imgFile;
      //console.log('+++', this.image);
      this.image.onload = () => {
        console.log('Full size: ', this.image.src.length, this.image.width, this.image.height);
        var smallImgSrc = imageToDataUri(this.image);
        this.src = smallImgSrc;
        var smallImage = new Image();
        smallImage.src = smallImgSrc.toString();
        this.disableUploadButton = false;
        smallImage.onload = () => {
          //$('#' + this.id).attr('src', smallImgSrc);
          console.log('New Size: ', this.id, smallImage.src.length, smallImage.width, smallImage.height);  
 
          if(this.ctx) {
            this.ctx.drawImage(smallImage, 0, 0);
            this.imageWidth = smallImage.width;
            this.imageHeight = smallImage.height;
         }
        };

      }
    };

    reader.readAsDataURL(this.fileToUpload);
    this.showSubmitButtonFlg = true;
    this.showImageFlg = true;

  }
  cancelUpload() {
    this.showSubmitButtonFlg = false;
    this.showSelectButtonFlg = true;
    this.showImageFlg = false;
    this.image = null;
    this.drawImage();
  }
  uploadImageButtonClicked() {
    this.showSubmitButtonFlg = false;
    this.messageEvent.emit('upload');
  }

  drawImage() {
    if (!this.ctx)
      return;
    this.ctx.fillStyle = 'gray';
    var rect = this.canvas.getBoundingClientRect();
    this.ctx.fillRect(0, 0, rect.right, rect.bottom);

    var width = this.imageWidth * this.zoomLevel / 100;
    var height = this.imageHeight * this.zoomLevel / 100;

    this.imageLeft = this.lastLeft + this.currentPointX - this.startPointX;
    this.imageTop = this.lastTop + this.currentPointY - this.startPointY;

    if (this.imageLeft > 0)
      this.imageLeft = 0;
    if (this.imageTop > 0)
      this.imageTop = 0;

    if (this.imageLeft + width < this.canvasWidth)
      this.imageLeft = this.canvasWidth - width;

    if (this.imageTop + height < this.canvasHeight) {
      this.imageTop = this.canvasHeight - height;
    }

    if(this.image)
      this.ctx.drawImage(this.image, this.imageLeft, this.imageTop, width, height);
    //console.log('draw!');

  }

  centerImage() {
    if(!this.ctx) {
      console.log('error!');
      return;
    }
    this.ctx.fillStyle = 'gray';
    var rect = this.canvas.getBoundingClientRect();
    this.ctx.fillRect(0, 0, rect.right, rect.bottom);

    var width = this.imageWidth * this.zoomLevel / 100;
    var height = this.imageHeight * this.zoomLevel / 100;

    this.lastLeft = (width - this.canvasWidth) * -1 / 2;
    this.lastTop = (height - this.canvasHeight) * -1 / 2;
    this.startPointX = this.currentPointX;
    this.startPointY = this.currentPointY;

    this.drawImage();
  }

  getPosition(event: any) {
//    console.log('getPosition', event);
    this.lastLeft = this.imageLeft;
    this.lastTop = this.imageTop;
    var x = event.offsetX;
    var y = event.offsetY;
    this.startPointX = x;
    this.startPointY = y;
    this.currentPointX = x;
    this.currentPointY = y;
    this.isDragging = true;
    this.drawImage();
  }
  moveMouse(event: any) {
    if (this.isDragging) {
      this.currentPointX = event.offsetX;
      this.currentPointY = event.offsetY;
      this.drawImage();
    }
  }
  endPosition(event: any) {
    this.startPointX = this.currentPointX;
    this.startPointY = this.currentPointY;
    this.lastLeft = this.imageLeft;
    this.lastTop = this.imageTop;
    this.drawImage();
    this.isDragging = false;
  }

  zoomImage(amount: number) {

    var zoomLevel = this.zoomLevel + amount;
    var width = this.imageWidth * zoomLevel / 100;
    var height = this.imageHeight * zoomLevel / 100;

    if (amount > 0 || (width >= this.canvasWidth && height >= this.canvasHeight)) {
      this.zoomLevel += amount;
      this.drawImage();
    }

  }

  positionImageRight(amount: number) {
    this.currentPointX = this.startPointX + amount;
    this.currentPointY = this.startPointY;
    this.drawImage();
  }

  positionImageDown(amount: number) {
    this.currentPointY = this.startPointY + amount;
    this.currentPointX = this.startPointX;
    this.drawImage();
  }

  captureImage() {
    if (this.canvas)
      this.src = this.canvas.toDataURL('image/jpeg');
    this.disableUploadButton = true;

    setTimeout(() => {
      this.messageEvent.emit('upload');
      console.log('hey! this.src', this.src);
    }, 500);

  }


}

function imageToDataUri(img: any) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  /*
  var MAXSIZE = 500;
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
  }*/
  var pct = 1;
  if (img.height > 0)
    pct = 480 / img.height;

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
