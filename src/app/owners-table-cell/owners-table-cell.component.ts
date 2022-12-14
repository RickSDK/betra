import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-owners-table-cell',
  templateUrl: './owners-table-cell.component.html',
  styleUrls: ['./owners-table-cell.component.scss']
})
export class OwnersTableCellComponent implements OnInit {
  @Input('ownersList') ownersList: any = [];
  @Input('user') user: any = null;
  @Input('tableName') tableName: string = '';
  @Output() messageEvent = new EventEmitter<any>();

  public emailStr: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.ownersList)
      this.populateEmailList();
  }

  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  populateEmailList() {
    var emails: any = [];
    this.ownersList.forEach((element: any) => {
      emails.push(element.email);
    });
    this.emailStr = emails.join('; ');
  }

  selectPlayer(player: any) {
    this.messageEvent.emit(player);
  }

}
