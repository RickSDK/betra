import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner-cell',
  templateUrl: './owner-cell.component.html',
  styleUrls: ['./owner-cell.component.scss']
})
export class OwnerCellComponent implements OnInit {
  @Input('person') person: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
