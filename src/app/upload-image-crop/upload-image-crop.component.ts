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

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
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
        this.ctx.drawImage(this.image, 0, 0);
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
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
    this.ctx.fillStyle = 'gray';
    var rect = this.canvas.getBoundingClientRect();
    this.ctx.fillRect(0, 0, rect.right, rect.bottom);

    var width = this.imageWidth * this.zoomLevel / 100;
    var height = this.imageHeight * this.zoomLevel / 100;
    var y = this.imageTop + this.currentPointY - this.startPointY;
    var x = this.imageLeft + this.currentPointX - this.startPointX;

    if (x + this.imageWidth < this.canvasWidth)
      x = this.canvasWidth - this.imageWidth;

    if (y + this.imageHeight < this.canvasHeight) {
      y = this.canvasHeight - this.imageHeight;
    }

    if (x > 0)
      x = 0;
    if (y > 0)
      y = 0;

    if (this.image)
      this.ctx.drawImage(this.image, x, y, width, height);

    //  console.log('y', y, rect.bottom, this.imageHeight);

  }

  getPosition(event: any) {
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    this.startPointX = x;
    this.startPointY = y;
    this.currentPointX = x;
    this.currentPointY = y;
    //console.log('start', this.startPointX, this.startPointY);
    this.isDragging = true;
    this.drawImage();
  }
  moveMouse(event: any) {
    if (this.isDragging) {
      var rect = this.canvas.getBoundingClientRect();
      this.currentPointX = event.clientX - rect.left;
      this.currentPointY = event.clientY - rect.top;
      //console.log('move to', this.currentPointX, this.currentPointY);
      this.drawImage();
    }
  }
  endPosition(event: any) {
    this.imageTop += this.currentPointY - this.startPointY;
    this.imageLeft += this.currentPointX - this.startPointX;
    this.isDragging = false;
  }

  zoomImage(amount: number) {
    this.zoomLevel += amount;
    this.drawImage();
  }

  captureImage() {
    this.showImageFlg = false;
    if(this.canvas)
      this.src = this.canvas.toDataURL('image/jpeg');
    console.log('here!', );
    this.messageEvent.emit('upload');
  }


}

function imageToDataUri(img: any) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var MAXSIZE = 800;
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
