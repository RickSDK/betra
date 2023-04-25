import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-ios-install',
  templateUrl: './ios-install.component.html',
  styleUrls: ['./ios-install.component.scss']
})
export class IosInstallComponent extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }


}
