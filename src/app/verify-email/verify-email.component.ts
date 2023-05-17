import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent extends BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }
  public code: number = 0;
  public verifySuccessFlg: boolean = false;;

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.code = parseInt(params['code']) || 0;
      this.userId = parseInt(params['userId']) || 0;

      if (this.code > 0 && this.userId > 0)
        this.getDataFromServer('verifyEmail', 'appApiCode.php', { code: this.code, userId: this.userId });
      else
        this.errorMessage = 'Invalid code or user ID!';
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log(file, responseJson);
    if (responseJson.action == 'verifyEmail') {
      this.verifySuccessFlg = true;
    }
  }

}
