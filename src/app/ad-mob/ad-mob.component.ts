import { Component, OnInit } from '@angular/core';
//import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';

@Component({
  selector: 'app-ad-mob',
  templateUrl: './ad-mob.component.html',
  styleUrls: ['./ad-mob.component.scss']
})

export class AdMobComponent implements OnInit {

  constructor() { }
/*
  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();
    console.log('admob status', status);
    if(status == 'authorized') {
      console.log('admob init');
      AdMob.initialize({
        requestTrackingAuthorization: true,
        initializeForTesting: true,
      });
      this.showBanner();
    }
  }

  async showBanner() {
    var unitId = 'ca-app-pub-2626924352662007/1324088676'; // betra
    //unitId = 'ca-app-pub-3940256099942544/6300978111'; //test

    const options: BannerAdOptions = {
      adId: unitId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
      // npa: true
    };
    await AdMob.showBanner(options);
  }
*/
  ngOnInit(): void {
    /*
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });
*/

  }

}
