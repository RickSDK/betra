import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseComponent implements OnInit {

  constructor() { super(); }


}
