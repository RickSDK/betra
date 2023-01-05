import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent extends BaseComponent implements OnInit {
  public businessAddress = '--address here--';
  //<a href="mailto:info@betradating.com">info@betradating.com </a>
  public legalEmail = 'info@betradating.com';
  public supportEmail = 'info@betradating.com';

  constructor() { super(); }


}
