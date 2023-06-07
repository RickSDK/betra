import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input('headerObj') headerObj: any = {};
  @Input('userId') userId: number = 0;
  
  constructor() { }

  ngOnInit(): void {
//    console.log('headerObj', this.headerObj);
  }

}
