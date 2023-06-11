import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
