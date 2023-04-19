import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    //this.getDataFromServer('checkCoins', 'coins.php', { room: 1 });
  }

}
