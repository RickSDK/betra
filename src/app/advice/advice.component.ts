import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent extends BaseComponent implements OnInit {
  public advicePage: any = null;
  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getAdviceUsers', 'advice.php', {});
  }

  addMe() {
    if (!this.user.memberFlg) {
      this.errorMessage = 'You must upgrade to get this feature. Only $2!';
      return;
    }
    this.getDataFromServer('addMe', 'advice.php', {});
  }
  removeMe() {
    this.getDataFromServer('removeMe', 'advice.php', {});
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == "getAdviceUsers") {
      this.advicePage = responseJson;
      //console.log('hey!', responseJson);
    }
  }
}
