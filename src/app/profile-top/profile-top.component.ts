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
  @Input('returnFlg') returnFlg: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();
  public largeImageFlg: boolean = false;
  public showSmallerPicsFlg: boolean = true;
  public unblurPicsFlg: boolean = false;
  public lookingForTitle: string = '';
  public distance: string = '';

  constructor() { }

  ngOnInit(): void {
    this.unblurPicsFlg = (this.myUser.memberFlg || this.myUser.user_id == this.user.user_id);
    this.user.mainImageSrc = this.user.imgSrc;
    this.lookingForTitle = this.user.maritalStatus + ' ' + this.user.genderName + ' ' + 'looking for ' + this.user.matchGender;
    this.calculateDistance();
  }
  calculateDistance() {
    this.distance = '';
    if(this.user.latitude && this.myUser.latitude && this.user.user_id != this.myUser.user_id) {
      var miles = distanceInKmBetweenEarthCoordinates(this.user.latitude, this.user.longitude, this.myUser.latitude, this.myUser.longitude);
      this.distance = parseInt(miles.toString()) + ' miles';  
    }
  }
  cancelMatches() {
    this.messageEvent.emit('cancel');
  }
  toggleImage() {
    this.largeImageFlg = !this.largeImageFlg;
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
      return 'profile-image';
  }
}
function degreesToRadians(degrees:number) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1:number, lon1:number, lat2:number, lon2:number) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}