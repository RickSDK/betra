import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-lite',
  templateUrl: './landing-page-lite.component.html',
  styleUrls: ['./landing-page-lite.component.scss']
})
export class LandingPageLiteComponent implements OnInit {
  public login: number = 0;
  public referralId: number = 0

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.login = params['login'] || 0;
      this.referralId = params['referralId'] || 0;
      if (this.referralId > 0) {
        this.login = 2;
        localStorage['referralId'] = this.referralId;
      }
    })
  }

  userIsLoggedIn(value: string) {
    if (value === 'login') {
      this.router.navigate(['home']);
    } else {
      console.log('value!!', value);
      //this.logoutUser();
    }
    console.log('user is logged in!');
  }
}
