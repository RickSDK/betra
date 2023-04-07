import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input('placeHolder') placeHolder: string = 'Type message';
  @Input('maxLength') maxLength: number = 500;
  @Input('value') value: string = '';

  @Output() messageEvent = new EventEmitter<string>();

  public strlen: number = 0;
  public emojis: any = ['👍', '🙂', '😀', '🤣', '😇', '🥰', '😍', '🤩', '🥲', '🤪', '🤑', '🤔', '🙄', '🤢', '🥶', '😵‍💫', '🤠', '🥳', '😎', '🤓', '😳', '😡', '💀', '💩', '👻', '🙈', '💝', '💔', '💋', '💯', '💬', '👌', '👏', '🙏', '🧠', '🤦‍♂️', '🤦‍♀️', '🤷‍♂️', '🤷‍♀️', '🦎', '🐙', '🍀'];
  public showEmojisFlg: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.showEmojisFlg = false;
  }
  inputValueChanged(event: any) {
    var e = (document.getElementById('messageInput') as HTMLInputElement);
    if (e) {
      //var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      var value = event.target.value.replace(/`/g, '');
      if (value != event.target.value) {
        e.value = value;
      }
      this.strlen = value.length;
      this.messageEvent.emit(value);
    }
  }

  submitButtonPressed() {
    this.showEmojisFlg = false;
    this.messageEvent.emit('[submitText]');
  }

  addEmoji(character: string) {
    var e = (document.getElementById('messageInput') as HTMLInputElement);
    if (e) {
      insertAtCaret(e, character)
//      e.value = e.value + character;
      this.strlen = e.value.length;
      this.messageEvent.emit(e.value);
    }
  }
}

function insertAtCaret(element:any, text:string) {
  if (document.getSelection()) {
    element.focus();
//  } else if (element.selectionStart || element.selectionStart === 0) {
    var startPos = element.selectionStart;
    var endPos = element.selectionEnd;
    var scrollTop = element.scrollTop;
    element.value = element.value.substring(0, startPos) +
      text + element.value.substring(endPos, element.value.length);
    element.focus();
    element.selectionStart = startPos + text.length;
    element.selectionEnd = startPos + text.length;
    element.scrollTop = scrollTop;
  } else {
    element.value += text;
    element.focus();
  }
}
