import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {
  @Input('stickyBottomFlg') stickyBottomFlg: boolean = false;
 
  constructor() { }

  ngOnInit(): void {
  }

}
