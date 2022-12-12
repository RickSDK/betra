import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-journal-cell',
  templateUrl: './journal-cell.component.html',
  styleUrls: ['./journal-cell.component.scss']
})
export class JournalCellComponent implements OnInit {
  @Input('journal') journal: any = null;
  @Input('index') index: number = 0;
  @Input('postId') postId: number = 0;
  @Input('imgSrc') imgSrc: string = '';
  

  @Output() messageEvent = new EventEmitter<any>();

  public replyToFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngClassPic(num: number) {
    if (num > 0)
      return 'profile-circle-small';
    else
      return 'profile-circle';
  }
  replyTo(journal: any) {
    this.messageEvent.emit(journal);
  }

}
