import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @Input('matchLevel') matchLevel: number = 0;
  @Input('placeHolder') placeHolder: string = 'Type message';
  @Input('id') id: string = '';
  @Input('maxLength') maxLength: number = 150;
  @Input('highlightFlg') highlightFlg: boolean = false;
  @Input('value') value: string = '';
  @Input('disabled') disabled: boolean = false;
  

  @Output() messageEvent = new EventEmitter<string>();

  public strlen: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  inputValueChanged(event: any) {
    var e = (document.getElementById(this.id) as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      value = value.replace(/`/g, '');
      e.value = value;
      this.strlen = value.length;
      if (this.highlightFlg)
        this.highlightFlg = false;
      this.messageEvent.emit(value);
    }
  }
  submitButtonPressed() {
    this.messageEvent.emit('[submitText]');
  }

}
