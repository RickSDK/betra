import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-text-with-enter',
  templateUrl: './text-with-enter.component.html',
  styleUrls: ['./text-with-enter.component.scss']
})
export class TextWithEnterComponent implements OnInit {
  @Input('placeHolder') placeHolder: string = 'Type message';
  @Input('id') id: string = 'textField';
  @Input('maxLength') maxLength: number = 150;
  @Input('highlightFlg') highlightFlg: boolean = false;
  @Input('value') value: string = '';
  @Input('disabled') disabled: boolean = false;
   public submitDisabled = true;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.submitDisabled = !(this.value && this.value.length>0);
  }

  textValueChanged(value: string) {
    this.submitDisabled = !(value && value.length>0);
    if (value == '[submitText]')
      this.submitValue();
  }
  submitValue() {
    var value = $('#'+this.id).val();
    this.messageEvent.emit(value);
    this.value = '';

  }
}
