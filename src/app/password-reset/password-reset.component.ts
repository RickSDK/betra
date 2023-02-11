import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent implements OnInit {
  public emailVerifyCode: number = 0;
  public newPassword: string = '';

  constructor(private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.emailVerifyCode = parseInt(params['code']) || 0;
    });
  }

  textValueSubmitted(password: string) {
    this.newPassword = password;
    this.getDataFromServer('updatePassword', 'appApiCode.php', { newPassword: password, emailVerifyCode: this.emailVerifyCode});
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if(responseJson.action == 'updatePassword') {
      this.successFlg = true;
      localStorage['code'] = btoa(this.newPassword);
      localStorage['savedPassword'] = this.newPassword;
      localStorage['savedCode'] = btoa(this.newPassword);
    }
  }

}
