import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  @Input('topTitle') topTitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
