import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {
  public showStatsFlg: boolean = false;
  public showLocationFlg: boolean = false;
  public showUpgradeFlg: boolean = false;
  /*
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
  public imageLeft: number = 0;*/

  constructor(private router: Router) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
/*
    this.canvas = document.querySelector('canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        this.image = new Image();
        this.image.src = "assets/images/bachelor.jpg";



        setTimeout(() => {
          this.ctx.drawImage(this.image, 0, 0);
          this.imageWidth = this.image.width;
          this.imageHeight = this.image.height;
          console.log('size', this.image.width, this.imageHeight);
        }, 100);

      }
    }*/
  }
/*
  drawImage() {
    this.ctx.fillStyle = 'gray';
    var rect = this.canvas.getBoundingClientRect();
    this.ctx.fillRect(0, 0, rect.right, rect.bottom);

    var width = this.imageWidth * this.zoomLevel / 100;
    var height = this.imageHeight * this.zoomLevel / 100;
    var y = this.imageTop + this.currentPointY - this.startPointY;
    var x = this.imageLeft + this.currentPointX - this.startPointX;
    if (x > 0)
      x = 0;
    if (y > 0)
      y = 0;

    if (x + this.imageWidth < 400)
      x = 400 - this.imageWidth;

    if (y + this.imageHeight < rect.bottom)
      y = rect.bottom - this.imageHeight;

    this.ctx.drawImage(this.image, x, y, width, height);
    //console.log('x', x, this.imageWidth, rect.right, x + this.imageWidth);

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
    this.drawImage();
    this.isDragging = true;
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
    let imageSrc = this.canvas.toDataURL('image/jpeg');

    var canvas = document.getElementById('myCanvas2');

    if (canvas) {
      var ctx = this.canvas.getContext('2d');
      if (ctx) {
        console.log('hey', canvas, ctx);
        var image = new Image();
        image.src = imageSrc;
        setTimeout(() => {
          ctx.drawImage(image, 0, 0);

        }, 2000);
      }
    }
  }*/

  logout() {
    this.userId = 0;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.router.navigate(['']);
  }

  showStats() {
    this.showStatsFlg = true;
    this.getStats();
  }
  getStats() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "getStats"
    };
    console.log(params);
    this.executeApi('appApiCode2.php', params, true);
  }
  updateLocation() {
    this.loadingFlg = true;
    this.populateGeoInfo();
  }
  showLocation() {
    this.showLocationFlg = !this.showLocationFlg;
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'updateGeoInfo') {
      this.user.city = responseJson.user.city;
      this.user.state = responseJson.user.state;
      this.user.countryName = responseJson.user.countryName;
      this.user.lat = responseJson.user.lat;
      this.user.lng = responseJson.user.lng;
      this.syncUserWithLocalStorage(responseJson);
    }
  }
}
