import { Component, OnInit, Input } from '@angular/core';

declare var getPlatform: any;

@Component({
  selector: 'app-bottom-links',
  templateUrl: './bottom-links.component.html',
  styleUrls: ['./bottom-links.component.scss']
})
export class BottomLinksComponent implements OnInit {
  @Input('userId') userId: number = 0;
  @Input('liteModeFlg') liteModeFlg: boolean = false;
  
  public platform = getPlatform();

  constructor() { }

  ngOnInit(): void {
  }

}
