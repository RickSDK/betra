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
  public statsObj:any = {};

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
      this.statsObj = {
        men: 0,
        women: 0,
        total: 0,
        menPercent: '',
        womenPercent: '',
        days1: 0,
        days3: 0,
        days7: 0,
        days14: 0,
        days1Percent: '',
        days3Percent: '',
        days7Percent: '',
        days14Percent: '',
      }
      responseJson.statsArray.forEach((element: any) => {
        this.statsObj.men += element.males;
        this.statsObj.women += element.females;
        this.statsObj.total += element.active;
        this.statsObj.days1 += element.days1;
        this.statsObj.days3 += element.days3;
        this.statsObj.days7 += element.days7;
        this.statsObj.days14 += element.days14;
      });
      var total = this.statsObj.total;
      if(total>0) {
        this.statsObj.menPercent = Math.round(this.statsObj.men*100/total);
        this.statsObj.womenPercent = 100 - this.statsObj.menPercent;
        this.statsObj.days1Percent = Math.round(this.statsObj.days1*100/total);
        this.statsObj.days3Percent = Math.round(this.statsObj.days3*100/total);
        this.statsObj.days7Percent = Math.round(this.statsObj.days7*100/total);
        this.statsObj.days14Percent = Math.round(this.statsObj.days14*100/total);
      }
    }
  }

}
