import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Blog } from '../classes/blog';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends BaseComponent implements OnInit {
  public login: number = 0;
  public override userId: number = 0;
  //public bgImg = 'assets/images/landing/logoWhite.png';
  public logo = 'assets/images/betraLogo.png';
  public adsbygoogle: any;
  public blogList: any = [];
  public backgroundImg = 'assets/images/landing/roseHome.png';
  public referralId: number = 0
  //public bgImg = 'assets/images/landing/logoBlack.png';

  constructor(private meta: Meta, private title: Title, private route: ActivatedRoute, private router: Router) {
    super();
    //this.meta.addTags([{name: 'description', content: 'Betra - Login'}]);
    //this.title.setTitle('Betra - Login');
  }
  override ngOnInit(): void {
    this.userId = localStorage['user_id'];
    //setTimeout(() => {
    //  (this.adsbygoogle = (window as any).adsbygoogle || []).push({});
    // }, 1000);
    this.route.queryParams.subscribe(params => {
      this.login = params['login'] || 0;
      this.referralId = params['referralId'] || 0;
      console.log('landing page referralId', this.referralId);
      if (this.referralId > 0) {
        this.login = 2;
      }
    })

    if (this.userId > 0)
      this.gotoMainMenu();

  }
  toggleBackground() {
    this.backgroundImg = (this.backgroundImg == 'assets/images/landing/background1.png') ? 'assets/images/landing/roseHome.png' : 'assets/images/landing/background1.png';
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

  override postSuccessApi(file: string, responseJson: any) {
    //console.log('xxx', responseJson);
    this.blogList = [];
    if (responseJson.action == "getBlogs") {
      responseJson.blogList.forEach((element: any) => {
        this.blogList.push(new Blog(element));
      });
    }
  }

}
