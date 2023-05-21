import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-owner-retention',
  templateUrl: './owner-retention.component.html',
  styleUrls: ['./owner-retention.component.scss']
})
export class OwnerRetentionComponent extends BaseComponent implements OnInit {
  public statsPage: any = null;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('retentionData', 'report.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'retentionData') {
      console.log(responseJson);
      this.statsPage = responseJson;
    }
  }

}
