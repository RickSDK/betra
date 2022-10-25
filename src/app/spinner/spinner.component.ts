import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input('loadingFlg') loadingFlg:boolean = false;
  @Input('errorMessage') errorMessage:string = '';
  @Input('successFlg') successFlg:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
