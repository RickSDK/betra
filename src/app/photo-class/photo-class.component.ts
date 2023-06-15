import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';
import { Photographer } from '../classes/photographer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-class',
  templateUrl: './photo-class.component.html',
  styleUrls: ['./photo-class.component.scss']
})
export class PhotoClassComponent extends BaseComponent implements OnInit {
  public classId: number = 0;
  public betraClass: any = null;
  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.classId = params['id'] || 0;
      this.getDataFromServer('loadClass', 'betraClasses.php', { classId: this.classId });
    });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      if (responseJson.classes && responseJson.classes.length == 1)
        this.betraClass = responseJson.classes[0];
      console.log('xxx', this.betraClass);
    }
  }

}
