import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owners-table-cell',
  templateUrl: './owners-table-cell.component.html',
  styleUrls: ['./owners-table-cell.component.scss']
})
export class OwnersTableCellComponent implements OnInit {
  @Input('ownersList') ownersList: any = [];
  @Input('user') user: any = null;
  @Input('tableName') tableName: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
