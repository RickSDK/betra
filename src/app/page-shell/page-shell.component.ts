import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input('notifications') notifications: number = localStorage['notifications'];
  @Input('userId') userId: number = 0;
  @Input('pageTitle') pageTitle: string = '';
  @Input('imgSrcFile') imgSrcFile: string = 'assets/images/theRock.png';

  public showMainMenuFlg: boolean = false;
  public firstName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage['user_id'] > 0 && localStorage['User']) {
      var user = new User(JSON.parse(localStorage['User']));
      this.firstName = user.firstName;
      this.imgSrcFile = user.imgSrc;
    }
  }
  ngClassToggleMenu() {
    if (this.showMainMenuFlg)
      return 'main-menu-popup popup-show';
    else
      return 'main-menu-popup popup-hide';
  }

  toggleMainMenu() {
    this.showMainMenuFlg = !this.showMainMenuFlg;
  }
  loginPressed() {
    console.log('loginPressed');
    this.messageEvent.emit();
  }
  loginTest() {
    console.log('loginTest!')
    this.userId = 1;
  }
  logout() {
    this.showMainMenuFlg = false;
    this.userId = 0;
    localStorage['user_id'] = '';
    localStorage['User'] = '';
    localStorage['email'] = '';
    localStorage['password'] = '';
    this.messageEvent.emit('logout');
    this.router.navigate(['']);
  }
}
