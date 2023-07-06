import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent extends BaseComponent implements OnInit {
  public address = '2712 92nd PL SE, Everett WA 98208';
  
  constructor(databaseService: DatabaseService) { super(databaseService); }

}
