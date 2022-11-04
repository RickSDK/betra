import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input('matchLevel') matchLevel: number = 0;

  @Output() messageEvent = new EventEmitter<string>();

  public placeHolder: string = 'Type response';
  public strlen: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.placeHolder = (this.matchLevel>=5)?'Type message':'Type response'
  }
  inputValueChanged(event: any) {
    var e = (document.getElementById('messageInput') as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      e.value = value;
      this.strlen = value.length;
      this.messageEvent.emit(value);
    }
  }
  submitButtonPressed() {
    this.messageEvent.emit('[submitText]');
  }
}
