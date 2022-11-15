import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit {
  @Input('dateObj') dateObj: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
