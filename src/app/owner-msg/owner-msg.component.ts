import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-msg',
  templateUrl: './owner-msg.component.html',
  styleUrls: ['./owner-msg.component.scss']
})
export class OwnerMsgComponent extends BaseComponent implements OnInit {
  public uid: number = 0;
  public page: any = {};

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
    });

    if (this.uid > 0)
      this.getDataFromServer('getMessages', 'owners.php', { uid: this.uid });
  }

  override postSuccessApi(file: string, responseJson: any) {
    console.log(responseJson);
    if (responseJson.action == 'getMessages') {
      this.page = responseJson;
    }
    //super.postSuccessApi(file, responseJson);
  }

}
