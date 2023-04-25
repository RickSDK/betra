import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-advice1',
  templateUrl: './advice1.component.html',
  styleUrls: ['./advice1.component.scss']
})
export class Advice1Component extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }



}
