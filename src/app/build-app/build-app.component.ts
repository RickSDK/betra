import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var getVersion: any;

@Component({
  selector: 'app-build-app',
  templateUrl: './build-app.component.html',
  styleUrls: ['./build-app.component.scss']
})
export class BuildAppComponent extends BaseComponent implements OnInit {
  public appVersion: string = getVersion();

  constructor() { super(); }

  //ngOnInit(): void {
  //}

}
