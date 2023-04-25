import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-safety-features',
  templateUrl: './safety-features.component.html',
  styleUrls: ['./safety-features.component.scss']
})
export class SafetyFeaturesComponent extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }


}
