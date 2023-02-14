import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Journal } from '../classes/journal';

@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
  }

}
