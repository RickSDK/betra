import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent extends BaseComponent implements OnInit {

  constructor(databaseService: DatabaseService) { super(databaseService); }

//  ngOnInit(): void {
//  }

}
