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

  public emailStr: string = '';

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.populateEmailList();
    }, 1000);
  }
  populateEmailList() {
    var emails: any = [];
    this.ownersList.forEach((element: any) => {
      emails.push(element.email);
    });
    this.emailStr = emails.join('; ');
  }

}
