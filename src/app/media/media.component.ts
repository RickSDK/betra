import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent extends BaseComponent implements OnInit {
  public images = [
    'assets/images/ads/ad1.png',
    'assets/images/ads/ad2.png',
    'assets/images/ads/cell-phone.webp',
    'assets/images/ads/logo.png',
    'assets/images/ads/splash.png',
    'assets/images/ads/table3.webp',
  ]
  constructor(databaseService: DatabaseService) { super(databaseService); }



}
