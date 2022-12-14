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
  @Input('showCheckFlg') showCheckFlg: boolean = false;
  @Input('icon') icon: string = '';
  @Input('img') img: string = '';
  @Input('smokes') smokes: string = '';
  @Input('cannabis') cannabis: string = '';
  @Input('drinks') drinks: string = '';

  public labelText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.labelText = this.label + ': ' + this.text1;
  }
  
  ngOnChanges(changes: any) {
    this.ngOnInit();
  }

  ngClassText() {
    if (!this.text1 || this.label.length + this.text1.length <= 15)
      return 'normal-text';
    else
      return 'small-text';
  }
}
