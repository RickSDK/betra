import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var FB: any;

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent extends BaseComponent implements OnInit {

  public levels = [
    'one person likes',
    'match made',
    'question asked',
    'question replied',
    '2nd question replied',
    'Exchanged info',
    'Exchanged picture',
    'Went on date'
  ];

  constructor(databaseService: DatabaseService) { super(databaseService); }

  /*
  window.fbAsyncInit = function () {
    FB.init({
      appId: '3399067146824355',
      cookie: true,
      xfbml: true,
      version: 'v15.0'
    });

    FB.AppEvents.logPageView();

  };

  (function (d, s, id) {
    var js:any, fjs:any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
*/
}
function checkLoginState() {
  FB.getLoginStatus(function(response:any) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response:any) {
  console.log('statusChangeCallback!!', response);
}