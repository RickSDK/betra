import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-owner-process-cc',
  templateUrl: './owner-process-cc.component.html',
  styleUrls: ['./owner-process-cc.component.scss']
})
export class OwnerProcessCcComponent extends BaseComponent implements OnInit {
  public page: any = {};

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('processCC', 'payments.php', {});
  }

  changeCardStatus(card: any, status: string) {
    card.status = status;
    this.getDataFromServer('changeCardStatus', 'payments.php', { row_id: card.row_id, status: card.status });
  }

  changeWithdrawStatus(card: any, status: string) {
    card.status = status;
    this.getDataFromServer('changeWithdrawStatus', 'payments.php', { row_id: card.row_id, status: card.status });
  }

  changeDepositStatus(card: any, status: string) {
    card.status = status;
    this.getDataFromServer('changeDepositStatus', 'payments.php', { row_id: card.row_id, status: card.status });
  }
  
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'processCC') {
      this.page = responseJson;
    }
  }

}
