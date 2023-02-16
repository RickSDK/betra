import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-upgrade-member',
  templateUrl: './upgrade-member.component.html',
  styleUrls: ['./upgrade-member.component.scss']
})
export class UpgradeMemberComponent extends BaseComponent implements OnInit {
  public plans = [
    { name: '1 Month', cost: '$19.99/month', payment: '$2' },
    { name: '3 Months', cost: '$14.99/month', payment: '$44.97' },
    { name: '12 Months', cost: '$10.99/month', payment: '$131.88' },
  ];
  public showUpgradeFlg: boolean = true;

  constructor() { super(); }



}
