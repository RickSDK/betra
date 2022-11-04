import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-green-check',
  templateUrl: './green-check.component.html',
  styleUrls: ['./green-check.component.scss']
})
export class GreenCheckComponent implements OnInit {
  @Input('label') label: string = '';
  @Input('text1') text1: string = '';
  @Input('text2') text2: string = '';
  @Input('icon') icon: string = '';
  @Input('img') img: string = '';
  @Input('smokes') smokes: string = '';
  @Input('cannabis') cannabis: string = '';
  @Input('drinks') drinks: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  ngClassText() {
    if (!this.text1 || this.label.length + this.text1.length <= 15)
      return 'normal-text';
    else
      return 'small-text';
  }
}
