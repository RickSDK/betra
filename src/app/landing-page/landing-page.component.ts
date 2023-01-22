import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public login: number = 0;
  public userId: number = 0;
  public showLoginPopup: boolean = false;
  public showSignupPopup: boolean = false;
  public bgImg = 'assets/images/landing/logoWhite.png';
  public adsbygoogle: any;
  //public bgImg = 'assets/images/landing/logoBlack.png';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage['user_id'];

    setTimeout(() => {
      (this.adsbygoogle = (window as any).adsbygoogle || []).push({});
    }, 1000);

    if (this.userId > 0)
      this.gotoMainMenu();
    else {
      this.route.queryParams.subscribe(params => {
        this.showLoginPopup = false;
        this.showSignupPopup = false;

        if (params['login'] == 1)
          this.showLoginPopup = true;
        if (params['login'] == 3)
          this.showSignupPopup = true;

      })
    }
  }

  gotoMainMenu() {
    this.router.navigate(['home']);
  }

  userIsLoggedIn(value: string) {
    if (value === 'login') {
      this.gotoMainMenu();
    } else {
      console.log('value!!', value);
      //this.logoutUser();
    }
    console.log('user is logged in!');
  }

}
