import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-text-with-emoji',
  templateUrl: './text-with-emoji.component.html',
  styleUrls: ['./text-with-emoji.component.scss']
})
export class TextWithEmojiComponent implements OnInit {
  @Input('placeHolder') placeHolder: string = 'Type message';
  @Input('id') id: string = 'textField';
  @Input('maxLength') maxLength: number = 150;
  @Input('user_id') user_id: number = 0;
  @Input('profilePic') profilePic: number = 0;
  @Input('highlightFlg') highlightFlg: boolean = false;
  @Input('value') value: string = '';
  @Input('disabled') disabled: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  public submitDisabled = true;
  public showEmojisFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.submitDisabled = !(this.value && this.value.length > 0);
  }

  textValueChanged(value: string) {
    this.submitDisabled = !(value && value.length > 0);
    if (value == '[submitText]')
      this.submitValue();
  }
  submitValue() {
    var value = $('#messageInput').val();
    this.messageEvent.emit(value);
    $('#messageInput').val('');

  }

}
