import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-header2',
  templateUrl: './top-header2.component.html',
  styleUrls: ['./top-header2.component.scss']
})
export class TopHeader2Component implements OnInit {
  @Input('topTitle') topTitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
