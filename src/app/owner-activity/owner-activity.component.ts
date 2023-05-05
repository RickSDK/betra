import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';

declare var lastLoginText: any;

@Component({
  selector: 'app-owner-activity',
  templateUrl: './owner-activity.component.html',
  styleUrls: ['./owner-activity.component.scss']
})
export class OwnerActivityComponent extends BaseComponent implements OnInit {

  public men: any = [];
  public women: any = [];

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getOwnerActivity', 'owners.php', []);
  }

  emailReports() {
    this.loadingFlg = true;
    var count=0;
    this.women.forEach((element: { user_id: any; firstName: any; }) => {
      count++;
      setTimeout(() => {
        console.log('emailing ', element.user_id, element.firstName);
        this.getDataFromServer('emailReport', 'report.php', { uid: element.user_id });
        
      }, count*1000);
   });

    this.men.forEach((element: { user_id: any; firstName: any; }) => {
      count++;
      setTimeout(() => {
        console.log('emailing ', element.user_id, element.firstName);
        this.getDataFromServer('emailReport', 'report.php', { uid: element.user_id });
        
      }, count*1000);
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log('xxx', responseJson);
    if (responseJson.action == 'getOwnerActivity') {
      this.men = [];
      this.women = [];
      responseJson.users.forEach((element: any) => {
        if (element.gender == 'F')
          this.women.push(new User(element));
        else
          this.men.push(new User(element));
      });

      this.women.sort((a: any, b: any) => {
        return (parseInt(a.statsObj.matchLevel1) < parseInt(b.statsObj.matchLevel1)) ? 1 : (parseInt(a.statsObj.matchLevel1) > parseInt(b.statsObj.matchLevel1)) ? -1 : 0;
      });

      this.men.sort((a: any, b: any) => {
        return (parseInt(a.statsObj.matchLevel1) < parseInt(b.statsObj.matchLevel1)) ? 1 : (parseInt(a.statsObj.matchLevel1) > parseInt(b.statsObj.matchLevel1)) ? -1 : 0;
      });
    }
  }


}
