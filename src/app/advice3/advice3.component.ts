import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-advice3',
  templateUrl: './advice3.component.html',
  styleUrls: ['./advice3.component.scss']
})
export class Advice3Component extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }



}
