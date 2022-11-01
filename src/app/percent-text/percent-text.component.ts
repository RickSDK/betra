import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-percent-text',
  templateUrl: './percent-text.component.html',
  styleUrls: ['./percent-text.component.scss']
})
export class PercentTextComponent implements OnInit {
  @Input('label') label: string = '';
  @Input('amount') amount: number = 0;
  @Input('loadingFlg') loadingFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngclassPercent(amount: number) {
    if (amount >= 85)
      return 'green-value';
    if (amount >= 50)
      return 'yellow-value';

    return 'red-value';

  }
}
