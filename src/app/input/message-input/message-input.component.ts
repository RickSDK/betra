import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input('matchLevel') matchLevel: number = 0;
  @Input('placeHolder') placeHolder: string = 'Type message';
  @Input('maxLength') maxLength: number = 500;

  @Output() messageEvent = new EventEmitter<string>();

  public strlen: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  inputValueChanged(event: any) {
    var e = (document.getElementById('messageInput') as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      value = value.replace(/`/g, '');
      e.value = value;
      this.strlen = value.length;
      this.messageEvent.emit(value);
    }
  }
  submitButtonPressed() {
    this.messageEvent.emit('[submitText]');
  }
}
