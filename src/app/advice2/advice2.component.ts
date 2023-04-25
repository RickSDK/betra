import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-advice2',
  templateUrl: './advice2.component.html',
  styleUrls: ['./advice2.component.scss']
})
export class Advice2Component extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }



}
