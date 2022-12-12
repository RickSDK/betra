import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-percent-text',
  templateUrl: './percent-text.component.html',
  styleUrls: ['./percent-text.component.scss']
})
export class PercentTextComponent implements OnInit {
  @Input('label') label: string = '';
  @Input('amount') amount: number = 0;
  @Input('icon') icon: string = '';
  @Input('img') img: string = '';
  @Input('loadingFlg') loadingFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngclassPercent(amount: number) {
    if (amount >= 80)
      return 'green-value';
    else if (amount >= 50)
      return 'yellow-value';
    else
      return 'red-value';

  }
}
