import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner-org-chart-cell',
  templateUrl: './owner-org-chart-cell.component.html',
  styleUrls: ['./owner-org-chart-cell.component.scss']
})
export class OwnerOrgChartCellComponent implements OnInit {
  @Input('person') person: any = null;
  @Input('personTitle') personTitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
